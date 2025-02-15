import React, { useEffect } from 'react'
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import 'react-native-reanimated'
import { useAuth } from '@/utils/authContext'
import { useTheme } from '../components/themeContext'

const LoginScreen = () => {
	const router = useRouter()
	const { googleSignIn, isSetupAccount, idToken } = useAuth()
	const theme = useTheme()

	useEffect(() => {
		;(async () => {
			if (idToken) {
				try {
					const res = await isSetupAccount()
					if (!res) {
						router.push('/new_user')
					} else {
						router.push('/(tabs)')
					}
				} catch (error) {
					console.error('アカウント確認エラー', error)
				}
			}
		})()
	}, [idToken])

	return (
		<SafeAreaView
			style={[styles.safeArea, { backgroundColor: theme.background }]}
		>
			<View style={styles.container}>
				<Text style={[styles.subtitle, { color: theme.secondary }]}>
					暇人同士が繋がる通話アプリ
				</Text>
				<Text style={[styles.title, { color: theme.text }]}>
					Imacallaへようこそ
				</Text>
				<TouchableOpacity
					onPress={async () => {
						try {
							await googleSignIn()
						} catch (error) {
							console.error('ログインエラー', error)
						}
					}}
				>
					<View
						style={[
							styles.googleButton,
							{ backgroundColor: theme.cardBackground },
						]}
					>
						<FontAwesome
							name="google"
							size={25}
							color={theme.text}
							style={styles.googleIcon}
						/>
						<Text
							style={[styles.buttonText, { color: theme.text }]}
						>
							Googleでログイン
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	subtitle: {
		fontSize: 18,
		paddingBottom: 10,
	},
	title: {
		fontSize: 32,
		paddingBottom: 30,
		fontWeight: 'bold',
	},
	googleButton: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		padding: 12,
		paddingLeft: 26,
		paddingRight: 26,
		flexDirection: 'row',
	},
	googleIcon: {
		paddingRight: 10,
	},
	buttonText: {
		fontSize: 19,
	},
})

export default LoginScreen
