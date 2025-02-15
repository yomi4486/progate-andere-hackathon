import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import UserIcon from './UserIcon'
import { usePubSub } from '../../utils/PubSubContext'
import * as Room from '../../utils/room'
import { useRouter } from 'expo-router'
import { useAuth } from '../../utils/authContext'

interface FriendItemProps {
	id: string
	name: string
	message: string
}

const FriendItem: React.FC<FriendItemProps> = ({ id, name, message }) => {
	const router = useRouter()
	const { user } = useAuth()
	const { sendMessage } = usePubSub()

	const call = async () => {
		if (!user || !user.data || !user.data.idToken) return
		const roomId = await Room.postRoomById(user.data.idToken, id)
		sendMessage(`${id}/call`, JSON.stringify({ roomId }))
		router.replace(`/call/${roomId}`)
	}
	return (
		<View style={styles.friend}>
			<View style={styles.friendIconContainer}>
				<UserIcon size={50} isOnline={true} />
			</View>
			<View style={styles.friendInfo}>
				<Text style={styles.friendName}>{name}</Text>
				<View style={styles.friendMessageContainer}>
					<Text style={styles.friendMessage}>{message}</Text>
				</View>
			</View>
			<FontAwesome
				name="phone"
				style={styles.callIcon}
				onPress={() => {
					call()
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	friend: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 30,
	},
	friendIconContainer: {
		position: 'relative',
	},
	friendIcon: {
		fontSize: 50,
		color: '#007bff',
	},
	friendActiveDot: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		fontSize: 18,
		color: '#4CAF50',
	},
	friendInfo: {
		marginLeft: 10,
		flex: 1,
	},
	friendName: {
		fontSize: 16,
	},
	friendMessageContainer: {
		marginTop: 5,
		backgroundColor: '#ffffff',
		borderRadius: 10,
		padding: 5,
		maxWidth: '90%',
	},
	friendMessage: {
		fontSize: 14,
		color: '#333',
	},
	callIcon: {
		fontSize: 30,
		marginRight: 10,
		color: '#007bff',
	},
})

export default FriendItem
