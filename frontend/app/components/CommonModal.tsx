import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface CommonModalProps {
	visible: boolean
	onClose: () => void
	children: React.ReactNode
}

const CommonModal: React.FC<CommonModalProps> = ({
	visible,
	onClose,
	children,
}) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={styles.modalContainer}
				activeOpacity={1}
				onPressOut={onClose}
			>
				<View style={styles.modalContent}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={onClose}
					>
						<FontAwesome name="times" size={24} color="black" />
					</TouchableOpacity>
					{children}
				</View>
			</TouchableOpacity>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: '80%',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
		position: 'relative',
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		left: 10,
	},
})

export default CommonModal
