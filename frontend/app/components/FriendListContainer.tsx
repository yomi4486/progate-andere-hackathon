import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FriendList from './FriendList'

interface FriendListContainerProps {
	title: string
	friends: { name: string; lastLogin: string; isActive: boolean }[]
}

const FriendListContainer: React.FC<FriendListContainerProps> = ({
	title,
	friends,
}) => {
	const activeFriends = friends.filter((friend) => friend.isActive)
	const inactiveFriends = friends.filter((friend) => !friend.isActive)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text
					style={[
						styles.title,
						{ color: activeFriends.length > 0 ? 'green' : 'gray' },
					]}
				>
					{title}
				</Text>
				<Text
					style={[
						styles.count,
						{ color: activeFriends.length > 0 ? 'green' : 'gray' },
					]}
				>
					{friends.length}
				</Text>
			</View>
			<View style={styles.borderLine} />
			{friends.map((friend, index) => (
				<FriendList
					key={index}
					name={friend.name}
					lastLogin={friend.lastLogin}
				/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 15, // 横のmarginを5px大きく
		marginTop: 25, // 上のmarginも少し大きく
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 20, // フォントサイズを大きく
		fontWeight: 'bold',
		marginBottom: 15, // 下のmarginも少し大きく
	},
	count: {
		fontSize: 20, // フォントサイズを大きく
		fontWeight: 'bold',
	},
	borderLine: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 15, // 下のmarginも少し大きく
	},
})

export default FriendListContainer
