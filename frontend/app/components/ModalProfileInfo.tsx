import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Clipboard,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface ModalProfileInfoProps {
	name: string
	userId: string
	qrCode?: string // QRコードのURLまたはデータ
}

const ModalProfileInfo: React.FC<ModalProfileInfoProps> = ({
	name,
	userId,
	qrCode="",
}) => {
	const copyToClipboard = () => {
		Clipboard.setString(userId)
		alert('ユーザーIDがコピーされました')
	}

	return (
		<View style={styles.container}>
			<FontAwesome name="user-circle" size={80} color="#a0a0a0" />
			<Text style={styles.name}>{name}</Text>
			<View style={styles.userIdContainer}>
				<Text style={styles.userId}>{userId}</Text>
				<TouchableOpacity
					onPress={copyToClipboard}
					style={styles.copyButton}
				>
					<FontAwesome name="copy" size={20} color="#000" />
				</TouchableOpacity>
			</View>
			<View style={styles.qrCodeContainer}>
				{/* <Image source={{ uri: qrCode }} style={styles.qrCode} /> */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: 20,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
	},
	userIdContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f0f0f0',
		padding: 5,
		borderRadius: 10,
		marginBottom: 10,
		marginTop: 15,
	},
	userId: {
		fontSize: 16,
		color: '#808080',
		marginRight: 10,
	},
	copyButton: {
		padding: 5,
	},
	qrCodeContainer: {
		marginTop: 10,
	},
	qrCode: {
		width: 100,
		height: 100,
	},
})

export default ModalProfileInfo
