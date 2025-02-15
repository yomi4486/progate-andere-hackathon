import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CommonModal from './CommonModal'

interface SearchComfirmModalProps {
	visible: boolean
	onClose: () => void
	userName: string
}

const SearchComfirmModal: React.FC<SearchComfirmModalProps> = ({
	visible,
	onClose,
	userName,
}) => {
	const handleClose = () => {
		onClose()
	}

	return (
		<CommonModal visible={visible} onClose={handleClose}>
			<View style={styles.container}>
				<Text style={styles.message}>
					{userName}に申請を送りました！
				</Text>
				<TouchableOpacity
					style={styles.closeButton}
					onPress={handleClose}
				>
					<Text style={styles.buttonText}>閉じる</Text>
				</TouchableOpacity>
			</View>
		</CommonModal>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: 20,
	},
	message: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
		textAlign: 'center',
	},
	closeButton: {
		marginTop: 20,
		padding: 10,
		backgroundColor: 'green',
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
})

export default SearchComfirmModal
