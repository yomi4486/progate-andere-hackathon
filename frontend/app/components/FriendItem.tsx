import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAuth } from '../../utils/authContext'
import { usePubSub } from '../../utils/PubSubContext'
import * as Room from '../../utils/room'
import { SendCall } from '../../utils/mqttCommonType'
import { useTheme } from './themeContext'
import UserIcon from './UserIcon'

interface FriendItemProps {
	id: string
	name: string
	message: string
	icon_url: string
	isOnline?: boolean // オンライン状態を追加
}

const FriendItem: React.FC<FriendItemProps> = ({
	id,
	name,
	message,
	icon_url,
	isOnline = false, // デフォルト値を設定
}) => {
	const theme = useTheme()
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
		<View
			style={[styles.friend, { backgroundColor: theme.cardBackground }]}
		>
			<View style={styles.friendIconContainer}>
				{icon_url ? (
					<View style={styles.iconWrapper}>
						<Image
							source={{ uri: icon_url }}
							style={styles.friendIconImage}
						/>
						{isOnline && (
							<View
								style={[
									styles.onlineIndicator,
									{
										backgroundColor: theme.statusActive,
										borderColor: theme.cardBackground,
									},
								]}
							/>
						)}
					</View>
				) : (
					<UserIcon
						size={50}
						color={theme.iconDefault}
						isOnline={isOnline} // この値が正しく渡されているか確認
						imageUrl={icon_url}
					/>
				)}
			</View>
			<View style={styles.friendInfo}>
				<Text style={[styles.friendName, { color: theme.text }]}>
					{name}
				</Text>
				<View
					style={[
						styles.friendMessageContainer,
						{ backgroundColor: theme.background },
					]}
				>
					<Text
						style={[
							styles.friendMessage,
							{ color: theme.secondary },
						]}
					>
						{message}
					</Text>
				</View>
			</View>
			<FontAwesome
				name="phone"
				style={[styles.callIcon, { color: theme.primary }]}
				onPress={call}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	friend: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 30,
		padding: 10,
		borderRadius: 10,
	},
	friendIconContainer: {
		position: 'relative',
		marginRight: 10,
	},
	iconWrapper: {
		position: 'relative',
	},
	friendIconImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	onlineIndicator: {
		position: 'absolute',
		bottom: 2,
		right: 2,
		width: 15,
		height: 15,
		borderRadius: 7.5,
		borderWidth: 2.5,
	},
	friendInfo: {
		marginLeft: 10,
		flex: 1,
	},
	friendName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	friendMessageContainer: {
		marginTop: 5,
		borderRadius: 10,
		padding: 5,
		maxWidth: '90%',
	},
	friendMessage: {
		fontSize: 14,
	},
	callIcon: {
		fontSize: 30,
		marginRight: 10,
	},
})

export default FriendItem
