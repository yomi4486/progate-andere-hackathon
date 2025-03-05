import mqtt from 'mqtt'
import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './authContext'
import { useRouter } from 'expo-router'
import { SendCall, SendStatus } from '../utils/mqttCommonType'
import { get } from './users'
import { View, Text } from 'react-native'

export interface PubSubContextType {
	friendStatusMap: Record<string, FriendStatus>
	setFriendList: (friends: string[]) => void
	sendMessage: (topic: string, data: SendCall | SendStatus) => void
}

interface FriendStatus {
	status: string
	lastUpdate: number
}

export const PubSubContext = createContext<PubSubContextType | null>(null)

export const PubSubProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { user, idToken } = useAuth()
	const router = useRouter()

	// Wait for user authentication
	if (!user?.data.user || !idToken) {
		return (
			<View>
				<Text>aaa</Text>
			</View>
		)
	}

	const userId = user.data.user.id
	const [friends, setFriends] = useState<string[]>([])
	const [friendStatusMap, setFriendStatusMap] = useState<
		Record<string, FriendStatus>
	>({})

	// Fetch friends data when component mounts
	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const userData = await get(idToken)
				const friendIds = userData.friends.map((friend) => friend.id)
				setFriends(friendIds)
			} catch (error) {
				console.error('Failed to fetch friends:', error)
			}
		}
		fetchFriends()
	}, [idToken])

	const [client] = useState(
		mqtt.connect(process.env.EXPO_PUBLIC_WS_URL!, {
			rejectUnauthorized: false,
		}),
	)

	// Handle online status updates and cleanup
	useEffect(() => {
		// Send online status every 3 seconds
		const statusInterval = setInterval(() => {
			const status: SendStatus = { status: 'online' }
			client.publish(`${userId}/status`, JSON.stringify(status), {
				retain: true,
			})
		}, 3000)

		// Check for offline friends every second
		const cleanupInterval = setInterval(() => {
			const now = Date.now()
			setFriendStatusMap((prevMap) => {
				const newMap = { ...prevMap }
				let hasChanges = false

				Object.entries(newMap).forEach(([friendId, status]) => {
					if (
						status.status === 'online' &&
						now - status.lastUpdate > 5000
					) {
						newMap[friendId] = {
							status: 'offline',
							lastUpdate: now,
						}
						hasChanges = true
					}
				})

				return hasChanges ? newMap : prevMap
			})
		}, 1000)

		return () => {
			clearInterval(statusInterval)
			clearInterval(cleanupInterval)
			const status: SendStatus = { status: 'offline' }
			client.publish(`${userId}/status`, JSON.stringify(status), {
				retain: true,
			})
		}
	}, [])

	useEffect(() => {
		if (!client) return

		const handleConnect = () => {
			// Subscribe to friend statuses
			friends.forEach((friendId) => {
				client.subscribe(`${friendId}/#`)
			})

			client.subscribe(`${userId}/call`)
		}

		const handleMessage = (topic: string, message: Buffer) => {
			const [friendId, dataType] = topic.split('/')
			if (dataType === 'status') {
				const data = JSON.parse(message.toString()) as SendStatus
				const now = Date.now()

				setFriendStatusMap((prev) => ({
					...prev,
					[friendId]: { status: data.status, lastUpdate: now },
				}))
			} else if (dataType === 'call') {
				const data = JSON.parse(message.toString()) as SendCall
				router.push(`/call/${data.roomId}`)
			}
		}

		try {
			// Register event handlers
			client.on('connect', handleConnect)
			client.on('message', handleMessage)

			// Initial connection might already be established
			if (client.connected) {
				handleConnect()
			}

			// Cleanup event handlers
			return () => {
				client.off('connect', handleConnect)
				client.off('message', handleMessage)
			}
		} catch (e) {
			console.error('MQTT error:', e)
		}
	}, [client, friends, userId, router])

	const setFriendList = (friends: string[]) => {
		setFriends(friends)
	}

	const sendMessage = (topic: string, data: SendCall | SendStatus) => {
		client.publish(topic, JSON.stringify(data))
	}

	return (
		<PubSubContext.Provider
			value={{ friendStatusMap, setFriendList, sendMessage }}
		>
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
