import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Icons from 'react-native-vector-icons/FontAwesome5'
import { useAuth } from '@/utils/authContext'
import DefaultHeader from '../../components/Header'
import { localStyles } from '../../styles'
import FriendListContainer from '../../components/FriendListContainer'
import FloatingActionButton from '@/components/FloatActionButton'
import FriendRequestItem from '../../components/FriendRequestItem'
import AddFriendModal from '../../components/AddFriendModal'

export default function FriendsScreen() {
	const { currentUserInfo } = useAuth()
	const fromUsers = currentUserInfo!['from_users']
	const toUsers = currentUserInfo!['to_users']
	const [selectedTab, setSelectedTab] = useState('friends')
	const [isModalVisible, setModalVisible] = useState(false)

	let Friends: typeof currentUserInfo.from_users | null = null
	if (currentUserInfo != null) {
		function removeMatchingUsers(
			from: typeof currentUserInfo.from_users,
			to: typeof currentUserInfo.to_users,
		): typeof currentUserInfo.from_users {
			const toUserIds = new Set(
				to.map((user: typeof currentUserInfo) => user.to_user.id),
			)
			return from.filter(
				(user: typeof currentUserInfo) =>
					!toUserIds.has(user.from_user.id),
			)
		}
		Friends = removeMatchingUsers(fromUsers, toUsers)
	} else {
		// 例外処理
	}

	const activeFriends = [
		{ name: 'yomi', lastLogin: '10分前', isActive: true },
		{ name: 'mono', lastLogin: '20分前', isActive: true },
	]

	const inactiveFriends = [
		{ name: 'まる', lastLogin: '1日前', isActive: false },
		{ name: 'kuro', lastLogin: '3日前', isActive: false },
	]

	const friendRequests = [{ name: '新しい友達1' }, { name: '新しい友達2' }]

	const handleAddFriend = (friendName: string) => {
		// フレンド追加のロジックをここに追加
	}

	return (
		<View style={{ height: '100%' }}>
			<DefaultHeader title="フレンド" showSettingButton={true} />
			<View style={styles.tabContainer}>
				<TouchableOpacity
					onPress={() => setSelectedTab('friends')}
					style={styles.tab}
				>
					<View style={styles.tabContent}>
						<Icons
							name="user-friends"
							size={20}
							color={selectedTab === 'friends' ? 'green' : 'gray'}
							style={styles.tabIcon}
						/>
						<Text
							style={
								selectedTab === 'friends'
									? styles.activeTabText
									: styles.inactiveTabText
							}
						>
							フレンド
						</Text>
					</View>
					<View
						style={
							selectedTab === 'friends'
								? styles.activeTabLine
								: styles.inactiveTabLine
						}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setSelectedTab('pending')}
					style={styles.tab}
				>
					<View style={styles.tabContent}>
						<Icons
							name="envelope"
							size={20}
							color={selectedTab === 'pending' ? 'green' : 'gray'}
							style={styles.tabIcon}
						/>
						<Text
							style={
								selectedTab === 'pending'
									? styles.activeTabText
									: styles.inactiveTabText
							}
						>
							承認待ち
						</Text>
					</View>
					<View
						style={
							selectedTab === 'pending'
								? styles.activeTabLine
								: styles.inactiveTabLine
						}
					/>
				</TouchableOpacity>
			</View>
			<FloatingActionButton
				onPress={() => setModalVisible(true)}
				icon="add"
				color="#FFFFFF"
			/>
			<AddFriendModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
				onAddFriend={handleAddFriend}
			/>
			<ScrollView>
				{selectedTab === 'friends' && (
					<>
						<View style={localStyles.searchContainer}>
							<FontAwesome
								name="search"
								size={20}
								color="#a0a0a0"
							/>
							<TextInput
								style={localStyles.searchInput}
								placeholder="検索"
								placeholderTextColor="#a0a0a0"
							/>
						</View>
						<FriendListContainer
							title="アクティブなフレンド"
							friends={activeFriends}
						/>
						<FriendListContainer
							title="非アクティブなフレンド"
							friends={inactiveFriends}
						/>
					</>
				)}
				{selectedTab === 'pending' && (
					<View style={styles.pendingContainer}>
						{friendRequests.length === 0 ? (
							<Text>承認待ちのフレンドはありません。</Text>
						) : (
							friendRequests.map((request, index) => (
								<FriendRequestItem
									key={index}
									name={request.name}
									onApprove={() => {}}
									onReject={() => {}}
								/>
							))
						)}
					</View>
				)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
		marginTop: 30,
	},
	tab: {
		alignItems: 'center',
	},
	tabContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	tabIcon: {
		marginRight: 5,
	},
	activeTabText: {
		color: 'green',
		fontWeight: 'bold',
	},
	inactiveTabText: {
		color: 'gray',
	},
	activeTabLine: {
		height: 2,
		backgroundColor: 'green',
		width: '200%',
		marginTop: 10,
	},
	inactiveTabLine: {
		height: 2,
		backgroundColor: 'gray',
		width: '200%',
		marginTop: 10,
	},
	pendingContainer: {
		alignItems: 'center',
		marginTop: 20,
	},
})
