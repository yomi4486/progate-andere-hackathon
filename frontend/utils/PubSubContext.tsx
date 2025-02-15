import mqtt from 'mqtt'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './authContext'

export interface PubSubContextType {
	friendsStatus: Record<string, string> // フレンドのステータス
	setFriendList: (friends: string[]) => void // フレンドリストをセットする関数
}

export const PubSubContext = createContext<PubSubContextType | null>(null)

export const PubSubProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { user } = useAuth()
	if (!user || !user.data.user) {
		throw new Error('User is not authenticated')
	}

	const userId = user.data.user.id
	const [friends, setFriends] = useState<string[]>([])
	const [friendsStatus, setFriendsStatus] = useState<Record<string, string>>(
		{},
	)

	useEffect(() => {
		const client = mqtt.connect('mqtt://localhost:1883')

		client.on('connect', () => {
			console.log('Connected to MQTT')

			// 自分のステータスを送信
			client.publish(`status/${userId}`, 'online', { retain: true })

			// フレンドのステータスを購読
			friends.forEach((friendId) => {
				client.subscribe(`status/${friendId}`)
			})
		})

		client.on('message', (topic, message) => {
			const [_, friendId] = topic.split('/')
			setFriendsStatus((prev) => ({
				...prev,
				[friendId]: message.toString(),
			}))
		})

		return () => {
			// クリーンアップ処理: オフライン通知を送信 & クライアントを閉じる
			client.publish(`status/${userId}`, 'offline', { retain: true })
			client.end()
		}
	}, [userId, friends])

	const setFriendList = (friends: string[]) => {
		setFriends(friends)
	}

	return (
		<PubSubContext.Provider value={{ friendsStatus, setFriendList }}>
			{children}
		</PubSubContext.Provider>
	)
}

// コンテキストを利用するためのカスタムフック
export const usePubSub = () => {
	const context = useContext(PubSubContext)
	if (!context) {
		throw new Error('usePubSub must be used within a PubSubProvider')
	}
	return context
}
