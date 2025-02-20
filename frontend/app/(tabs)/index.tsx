import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	RefreshControl,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import { Text, View } from '@/components/Themed'
import { FontAwesome } from '@expo/vector-icons'
import FriendItem from '../components/FriendItem' // 追加
import DefaultHeader from '../components/Header'
import { profileStyles } from '../styles'
import { useState, useEffect } from 'react'
import FloatingActionButton from '@/components/FloatActionButton'
import * as Users from '@/utils/users'
import { useAuth } from '../../utils/authContext'
export default function HomeScreen() {
	const { currentUserInfo, idToken, updateCurrentUserInfo } = useAuth()
	const [statusMessage, setStatusMessage] = useState<string>('')
	const [isFocused, setIsFocused] = useState(false)
	const [userData, setUserData] =
		useState<Awaited<ReturnType<typeof Users.get>>>()

	const [refreshing, setRefreshing] = useState(false)
	const [refreshNumber, setRefreshNumber] = useState<number>(0)
	useEffect(() => {
		;(async () => {
			if (idToken) {
				const res = await Users.get(idToken)
				setUserData(res)
			}
		})()
	}, [refreshNumber])

	function pushToReload(): void {
		setRefreshing(true)
		setRefreshNumber(refreshNumber + 1)
		setRefreshing(false)
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss()
			}}
		>
			<View style={{ height: '100%' }}>
				<DefaultHeader
					title="あなたのステータス"
					showSettingButton={true}
				/>
				<FloatingActionButton
					onPress={async () => {
						// 通話開始のモーダルを表示
					}}
					icon="add"
					color="#FFFFFF"
				/>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={pushToReload}
						/>
					}
				>
					<View style={profileStyles.profileContainer}>
						<View>
							{currentUserInfo ? (
								<Image
									source={{
										uri: currentUserInfo['icon_url'],
									}}
									style={{
										width: 90,
										height: 90,
										borderRadius: 50,
									}}
								/>
							) : (
								<FontAwesome
									name="user-circle"
									style={styles.Icon}
								/>
							)}
						</View>
						<Text style={profileStyles.profileName}>
							{currentUserInfo
								? currentUserInfo['username']
								: 'loading...'}
						</Text>
						<TouchableOpacity
							style={profileStyles.profileStatusContainer}
						>
							<View
								style={
									isFocused
										? profileStyles.statusInputContainer
										: profileStyles.blurStatusInputContainer
								}
							>
								<FontAwesome
									name="circle"
									style={profileStyles.activeDot}
								/>
								<TextInput
									style={
										isFocused
											? profileStyles.statusInput
											: profileStyles.blurStatusInput
									}
									placeholder="現在のステータスを入力"
									defaultValue={
										currentUserInfo
											? currentUserInfo['status_message']
											: ''
									}
									onChangeText={(text) => {
										setStatusMessage(text)
									}}
									onFocus={() => setIsFocused(true)}
									onBlur={() => setIsFocused(false)}
								/>
								<FontAwesome
									name={
										currentUserInfo &&
										statusMessage ==
											currentUserInfo['status_message']
											? 'pencil'
											: 'check'
									}
									style={profileStyles.statusEditIcon}
									onPress={async () => {
										const res = await Users.put(
											{
												status: undefined,
												username: undefined,
												icon_url: undefined,
												status_message: statusMessage,
												introduction: undefined,
											},
											idToken!,
										)
										if (currentUserInfo) {
											const a: typeof currentUserInfo =
												currentUserInfo
											a!.status_message =
												res!['status_message']
											updateCurrentUserInfo(a)
											setStatusMessage(
												res!['status_message'],
											)
										}
									}}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={profileStyles.friendsContainer}>
						<Text style={profileStyles.friendsTitle}>
							アクティブなフレンド
						</Text>
						<View style={profileStyles.friendsBox}>
							{userData ? (
								userData.friends.map((friend) => {
									return (
										<FriendItem
											key={friend.id}
											id={friend.id}
											name={friend.username}
											message={friend.status_message}
											icon_url={friend.icon_url}
										/>
									)
								})
							) : (
								<Text>loading...</Text>
							)}
							{/* 他のフレンドも同様に追加 */}
						</View>
					</View>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	Icon: {
		fontSize: 100,
		color: '#cccccc',
	},
})
