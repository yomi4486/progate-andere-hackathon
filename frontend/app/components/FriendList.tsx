import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface FriendListProps {
	name: string
	isActive: boolean
	statusMessage: string
	icon_url: string
}

const FriendList: React.FC<FriendListProps> = ({
	name,
	isActive,
	statusMessage,
	icon_url,
}) => {
	return (
		<View style={styles.friendItem}>
			<View style={styles.iconContainer}>
				<Image source={{ uri: icon_url }} style={styles.iconImage} />

				<View
					style={[
						styles.onlineIndicator,
						{ backgroundColor: isActive ? 'green' : '#333333' },
					]}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.friendName}>{name}</Text>
				<Text style={styles.statusMessage}>{statusMessage}</Text>
			</View>
			<FontAwesome name="ellipsis-v" size={24} color="#A0A0A0" />
		</View>
	)
}

const styles = StyleSheet.create({
	friendItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#EEEEEE',
		padding: 15,
		marginVertical: 7,
		borderRadius: 5,
	},
	iconContainer: {
		position: 'relative',
		marginRight: 15,
	},
	onlineIndicator: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 12,
		height: 12,
		borderRadius: 6,
	},
	textContainer: {
		flex: 1,
	},
	friendName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	statusMessage: {
		fontSize: 16,
		color: '#808080',
	},
	iconImage: {
		width: 45,
		height: 45,
		borderRadius: 22.5, // 円形にする
	},
})

export default FriendList
