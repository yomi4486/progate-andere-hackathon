import { Text, View } from '@/components/Themed'
import { FontAwesome } from '@expo/vector-icons'
import { profileStyles } from '../styles'
import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { useAuth } from '@/utils/authContext'
import DefaultHeader from '../components/Header'
import FloatingActionButton from '@/components/FloatActionButton'
import { router } from 'expo-router'
import * as Users from '@/utils/users'
import { useState } from 'react'
export default function NewUserScreen() {
	const { user } = useAuth()
	const [introductionValue, setIntriduction] = useState<string>('')
	const [displayName, setDisplayName] = useState<string>(
		`${user?.data.user.name}`,
	)
	return (
		<View style={{ height: '100%' }}>
			<DefaultHeader
				title="プロフィールを作りましょう！"
				showSettingButton={false}
			/>
			<View style={profileStyles.profileContainer}>
				<View style={styles.IconContainer}>
					{user?.data.user.photo ? (
						<Image
							source={{ uri: `${user?.data.user.photo}` }}
							style={{
								width: 100,
								height: 100,
								borderRadius: 50,
							}}
						/>
					) : (
						<FontAwesome name="user-circle" style={styles.Icon} />
					)}
				</View>
				<View style={profileStyles.statusInputContainer}>
					<TextInput
						style={StyleSheet.compose(profileStyles.statusInput, {
							textAlign: 'center',
							paddingLeft: 20,
						})}
						placeholder="表示名"
						defaultValue={`${user?.data.user.name}`}
						onChangeText={(input) => {
							setDisplayName(input)
						}}
					/>
					<FontAwesome
						name="pencil"
						style={profileStyles.statusEditIcon}
						onPress={() => {}}
					/>
				</View>
			</View>
			<Text
				style={StyleSheet.compose(profileStyles.friendsTitle, {
					paddingLeft: 30,
					paddingTop: 20,
				})}
			>
				自己紹介
			</Text>
			<View style={{ alignItems: 'center' }}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						width: '80%',
						borderColor: '#cccccc',
						borderWidth: 1,
						borderRadius: 20,
						paddingHorizontal: 10,
					}}
				>
					<TextInput
						style={{
							textAlign: 'center',
							height: 40,
							padding: 10,
							minHeight: 60,
						}}
						placeholder="自己紹介"
						multiline={true}
						numberOfLines={4}
						onChangeText={(input) => {
							setIntriduction(input)
						}}
					/>
				</View>
			</View>
			<FloatingActionButton
				onPress={async () => {
					try {
						if (
							user?.data.user.photo &&
							displayName.length != 0 &&
							user?.data.idToken
						) {
							const res = await Users.post(
								{
									status: '',
									username: displayName,
									icon_url: user?.data.user.photo,
									status_message: '',
									introduction: introductionValue,
								},
								user?.data.idToken,
							)
							console.log(res)
							if (res) {
								router.push('/(tabs)')
							} else {
								throw Error('Post failed.')
							}
						} else {
							throw Error(
								'Icon photo or display name cannot be empty',
							)
						}
					} catch (e) {
						console.error(e)
					}
				}}
				icon="arrow-forward"
				color="#FFFFFF"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	IconContainer: {
		position: 'relative',
		borderRadius: 100,
	},
	Icon: {
		fontSize: 100,
		color: '#cccccc',
	},
	EditButton: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		fontSize: 20,
		color: '#222222',
		backgroundColor: '#999999DD',
		borderRadius: 20,
		padding: 7,
	},
})
