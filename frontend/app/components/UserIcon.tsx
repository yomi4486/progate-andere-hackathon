import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from './themeContext' // テーマを追加

interface UserIconProps {
	size?: number
	color?: string
	isOnline?: boolean
	imageUrl?: string
}

const UserIcon: React.FC<UserIconProps> = ({
	size = 45,
	color = '#a0a0a0',
	isOnline = false,
	imageUrl,
}) => {
	const theme = useTheme() // テーマを使用

	return (
		<View style={styles.iconContainer}>
			{imageUrl ? (
				<Image
					source={{ uri: imageUrl }}
					style={{
						width: size,
						height: size,
						borderRadius: size / 2,
					}}
				/>
			) : (
				<FontAwesome name="user-circle" size={size} color={color} />
			)}
			{isOnline && (
				<View
					style={[
						styles.onlineIndicator,
						{
							width: size / 3,
							height: size / 3,
							borderRadius: size / 3 / 2,
							backgroundColor: theme.statusActive, // テーマカラーを使用
							borderColor: theme.cardBackground, // テーマカラーを使用
						},
					]}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	iconContainer: {
		position: 'relative',
		marginRight: 10,
	},
	onlineIndicator: {
		position: 'absolute',
		bottom: 2,
		right: 2,
		borderWidth: 2.5,
	},
})

export default UserIcon
