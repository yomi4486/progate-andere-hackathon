import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface UserIconProps {
	size?: number
	color?: string
	isOnline?: boolean
}

const UserIcon: React.FC<UserIconProps> = ({
	size = 45,
	color = '#a0a0a0',
	isOnline = false,
}) => {
	return (
		<View style={styles.iconContainer}>
			<FontAwesome name="user-circle" size={size} color={color} />
			{isOnline && (
				<View
					style={[
						styles.onlineIndicator,
						{
							width: size / 3,
							height: size / 3,
							borderRadius: size / 3 / 2,
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
		backgroundColor: '#57c640',
		borderWidth: 2.5,
		borderColor: '#a0a0a0',
	},
})

export default UserIcon
