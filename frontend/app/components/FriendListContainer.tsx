import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FriendList from './FriendList'

interface FriendListContainerProps {
	title: string
	friends: {
		username: string
		isActive: boolean
		statusMessage: string
		icon_url: string // 追加
	}[]
}

const FriendListContainer: React.FC<FriendListContainerProps> = ({
	title,
	friends,
}) => {
	const isNonActive = title === '非アクティブなフレンド'
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text
					style={[
						styles.title,
						{
							color: isNonActive
								? 'gray'
								: friends.length > 0
									? 'green'
									: 'gray',
						},
					]}
				>
					{title}
				</Text>
				<Text
					style={[
						styles.count,
						{
							color: isNonActive
								? 'gray'
								: friends.length > 0
									? 'green'
									: 'gray',
						},
					]}
				>
					{friends.length}
				</Text>
			</View>
			<View style={styles.borderLine} />
			{friends.length > 0 ? (
				friends.map((friend, index) => (
					<FriendList
						key={index}
						name={friend.username}
						isActive={friend.isActive}
						statusMessage={friend.statusMessage}
						icon_url={friend.icon_url}
					/>
				))
			) : (
				<View style={styles.noFriendsMessageContainer}>
					<Text style={styles.noFriendsMessage}>
						現在{title}がいません。
					</Text>
					<Text style={styles.noFriendsMessage}>
						フレンドを追加しましょう！
					</Text>
				</View>
			)}
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
	noFriendsMessageContainer: {
		alignItems: 'center',
		marginVertical: 20,
	},
	noFriendsMessage: {
		textAlign: 'center',
		color: '#808080',
		fontSize: 16,
		marginVertical: 5, // 上下の間隔を追加
	},
})

export default FriendListContainer
