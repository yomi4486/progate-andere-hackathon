import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'] // fontAwesomeの名前空間を継承（https://icons.expo.fyi/）
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: false, // ヘッダー（AppBar）の表示オプション
				tabBarStyle: {
					backgroundColor: '#222222', // タブの背景色を指定
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home" color={color} />
					),
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={25}
										color={
											Colors[colorScheme ?? 'light'].text
										}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="history/index"
				options={{
					title: 'History',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="history" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="friends/index"
				options={{
					title: 'Friends',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="users" color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
