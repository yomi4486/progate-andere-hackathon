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
import { useEffect } from 'react'
import * as Users from '@/utils/users'
import * as Friends from '../../../utils/friends'

export default function FriendsScreen() {
	const { idToken } = useAuth()
	const [selectedTab, setSelectedTab] = useState('friends')
	const [isModalVisible, setModalVisible] = useState(false)
	const [reload, SetReload] = useState(0)
	const [userData, setUserData] =
		useState<Awaited<ReturnType<typeof Users.get>>>()
	// アクティブと非アクティブフレンドを分けて管理するstate
	const [activeFriends, setActiveFriends] = useState<
		{
			username: string
			isActive: boolean
			statusMessage: string
			icon_url: string
		}[]
	>([])
	const [inactiveFriends, setInactiveFriends] = useState<
		{
			username: string
			isActive: boolean
			statusMessage: string
			icon_url: string
		}[]
	>([])

	useEffect(() => {
		;(async () => {
			if (idToken) {
				const res = await Users.get(idToken)
				setUserData(res)

				// フレンドをアクティブ状態で振り分け
				if (res?.friends) {
					const active = res.friends
						.filter((friend) => friend.status === 'ACTIVE')
						.map((friend) => ({
							username: friend.username,
							isActive: true,
							statusMessage: friend.status_message,
							icon_url: friend.icon_url,
						}))

					const inactive = res.friends
						.filter((friend) => friend.status !== 'ACTIVE')
						.map((friend) => ({
							username: friend.username,
							isActive: false,
							statusMessage: friend.status_message,
							icon_url: friend.icon_url,
						}))

					setActiveFriends(active)
					setInactiveFriends(inactive)
				}
			}
		})()
	}, [reload])

	return (
		<View style={{ height: '100%', backgroundColor: '#fff' }}>
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
			{/* <AddFriendModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
				// onAddFriend={handleAddFriend}
			/> */}
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
						{userData ? (
							<>
								<FriendListContainer
									title="アクティブなフレンド"
									friends={activeFriends}
								/>
								<FriendListContainer
									title="非アクティブなフレンド"
									friends={inactiveFriends}
								/>
							</>
						) : (
							<Text>loading...</Text>
						)}
					</>
				)}
				{selectedTab === 'pending' && (
					<View style={styles.pendingContainer}>
						{userData ? (
							userData.friends.length > 0 ? (
								userData.friends.map((friend, index) => (
									<FriendRequestItem
										key={index}
										name={friend.username}
										onApprove={() => {
											Friends.put(idToken!, friend.id, {
												status: 'ACCEPTED',
											}).then(() => {
												SetReload(reload + 1)
											})
										}}
										onReject={() => {
											Friends.put(idToken!, friend.id, {
												status: 'REJECTED',
											}).then(() => {
												SetReload(reload + 1)
											})
										}}
									/>
								))
							) : (
								<Text>承認待ちリクエストがありません</Text>
							)
						) : (
							<Text>loading...</Text>
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
