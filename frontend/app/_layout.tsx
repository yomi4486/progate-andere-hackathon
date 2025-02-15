import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import 'react-native-reanimated'
import { AuthProvider, useAuth } from '../utils/authContext'
import { useColorScheme } from '@/components/useColorScheme'
import { PubSubProvider } from '@/utils/PubSubContext'
import { registerGlobals } from '@livekit/react-native'

registerGlobals()

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ThemeProvider
			value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<AuthProvider>
				<ConditionalPubSubWrapper>
					<RootLayoutNav />
				</ConditionalPubSubWrapper>
			</AuthProvider>
		</ThemeProvider>
	)
}

function ConditionalPubSubWrapper({ children }: { children: React.ReactNode }) {
	const { user } = useAuth() // ユーザー情報を取得

	if (user) {
		// ログインしている場合のみ PubSubProvider を適用
		return <PubSubProvider>{children}</PubSubProvider>
	}

	// 未ログインならそのまま子要素を返す
	return <>{children}</>
}

function RootLayoutNav() {
	const { user, isSetupAccount } = useAuth()
	const router = useRouter()

	useEffect(() => {
		;(async () => {
			try {
				if (user && (await isSetupAccount())) {
					router.push('/(tabs)')
				} else {
					router.push('/login')
				}
			} catch (error) {
				console.error(error)
			}
		})()
	}, [])

	return <Slot />
}
