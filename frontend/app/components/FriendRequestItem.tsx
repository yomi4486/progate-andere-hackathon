import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface FriendRequestItemProps {
	name: string
	onApprove: () => void
	onReject: () => void
}

const FriendRequestItem: React.FC<FriendRequestItemProps> = ({
	name,
	onApprove,
	onReject,
}) => {
	return (
		<View style={styles.friendItem}>
			<View style={styles.iconContainer}>
				<FontAwesome name="user-circle" size={45} color="#a0a0a0" />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.friendName}>{name}</Text>
			</View>
			<View style={styles.actionContainer}>
				<TouchableOpacity onPress={onApprove}>
					<FontAwesome
						name="check"
						size={24}
						color="green"
						style={styles.actionIcon}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={onReject}>
					<FontAwesome
						name="times"
						size={24}
						color="red"
						style={styles.actionIcon}
					/>
				</TouchableOpacity>
			</View>
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
	textContainer: {
		flex: 1,
	},
	friendName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	actionContainer: {
		flexDirection: 'row',
	},
	actionIcon: {
		marginHorizontal: 10,
	},
})

export default FriendRequestItem
