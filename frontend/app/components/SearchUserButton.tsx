import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface SearchUserButtonProps {
	onPress: () => void
}

const SearchUserButton: React.FC<SearchUserButtonProps> = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<FontAwesome
				name="search"
				size={20}
				color="#FFFFFF"
				style={styles.icon}
			/>
			<Text style={styles.buttonText}>ユーザー検索</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'green',
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
	},
	icon: {
		marginRight: 10,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
})

export default SearchUserButton
