import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import UserIcon from './UserIcon'
import { usePubSub } from '../../utils/PubSubContext'
import * as Room from '../../utils/room'
import { useRouter } from 'expo-router'
import { useAuth } from '../../utils/authContext'
import { SendCall } from '../../utils/mqttCommonType'
import { Image } from 'react-native'

interface FriendItemProps {
	id: string
	name: string
	message: string
	icon_url: string
}

const FriendItem: React.FC<FriendItemProps> = ({
	id,
	name,
	message,
	icon_url,
}) => {
	const router = useRouter()
	const { user } = useAuth()
	const { sendMessage } = usePubSub()

	const call = async () => {
		if (!user || !user.data || !user.data.idToken) return
		const room = await Room.postRoomById(user.data.idToken, id)
		const data: SendCall = {
			roomId: room.id,
		}
		sendMessage(`${id}/call`, data)
		router.replace(`/call/${room.id}`)
	}
	return (
		<View style={styles.friend}>
			<View style={styles.friendIconContainer}>
				<Image
					source={{ uri: icon_url }}
					style={{
						width: 50,
						height: 50,
						borderRadius: 50,
					}}
				/>
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
