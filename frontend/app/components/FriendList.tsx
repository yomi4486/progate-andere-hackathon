import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface FriendListProps {
	name: string
	isActive: boolean
	statusMessage: string
}

const FriendList: React.FC<FriendListProps> = ({
	name,
	isActive,
	statusMessage,
}) => {
	console.log(isActive)
	return (
		<View style={styles.friendItem}>
			<View style={styles.iconContainer}>
				<FontAwesome name="user-circle" size={45} color="#a0a0a0" />
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
})

export default FriendList
