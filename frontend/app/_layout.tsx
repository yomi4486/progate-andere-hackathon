import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot, Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import 'react-native-reanimated'
import { AuthProvider, useAuth } from '../utils/authContext'
import { useColorScheme } from '@/components/useColorScheme'
import { PubSubProvider } from '@/utils/PubSubContext'
import { registerGlobals } from '@livekit/react-native'

registerGlobals()

export { ErrorBoundary } from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function RootLayoutNav() {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.replace('/login')
		} else {
			router.replace('/(tabs)') // ユーザーがログイン済みならホーム画面に遷移
		}
	}, [user])

	if (user) {
		return (
			<PubSubProvider>
				<Slot />
			</PubSubProvider>
		)
	}

	return <Slot />
}

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	})

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
				<RootLayoutNav />
			</AuthProvider>
		</ThemeProvider>
	)
}
