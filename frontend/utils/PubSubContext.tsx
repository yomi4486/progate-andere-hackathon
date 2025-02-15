import mqtt from 'mqtt'
import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './authContext'
import { useRouter } from 'expo-router'
import { SendCall, SendStatus } from '../utils/mqttCommonType'

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

	const router = useRouter()
	const userId = user.data.user.id
	const [friends, setFriends] = useState<string[]>(['aaaa', 'bbbb'])
	const [friendsStatus, setFriendsStatus] = useState<Record<string, string>>(
		{},
	)

	const [client, setClient] = useState(
		mqtt.connect('ws://localhost:3000', {
			rejectUnauthorized: false,
		}),
	)

	useEffect(() => {
		try {
			client.on('connect', () => {
				client.publish(`${userId}/status`, 'online', { retain: true })

				// フレンドのステータスを購読
				friends.forEach((friendId) => {
					client.subscribe(`${friendId}/#`)
				})

				client.subscribe(`${userId}/call`)
			})

			client.on('message', (topic, message) => {
				const [friendId, dataType] = topic.split('/')

				if (dataType == 'status') {
					const data = JSON.parse(message.toString()) as SendStatus
					setFriendsStatus((prev) => ({
						...prev,
						[friendId]: data.status,
					}))
				} else if (dataType == 'call') {
					const data = JSON.parse(message.toString()) as SendCall
					router.push(`/call/${data.roomId}`)
				}
			})
		} catch (e) {
			console.error('error:' + e)
		}
	}, [friends])

	const setFriendList = (friends: string[]) => {
		setFriends(friends)
	}

	const sendMessage = (topic: string, data: string) => {
		client.publish(topic, data)
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
