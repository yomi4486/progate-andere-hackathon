import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Expoを使用している場合

type Options = {
	icon?: React.ComponentProps<typeof Ionicons>['name']
	onPress: Function
	color?: string
	backgroundColor?: string
}

const FloatingActionButton: React.FC<Options> = ({
	icon = 'add',
	onPress,
	color = '#eeeeee',
	backgroundColor = '#222222',
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={StyleSheet.compose(styles.button, {
					backgroundColor: backgroundColor,
				})}
				onPress={() => {
					onPress()
				}}
			>
				<Ionicons name={icon} size={24} color={color} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		zIndex: 1000,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 5,
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 8,
	},
})

export default FloatingActionButton
