import React, { useState } from 'react'
import {
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View,
	Image,
} from 'react-native'
import { useTheme } from './themeContext'
import * as Friends from '../../utils/friends'
import { useAuth } from '@/utils/authContext'
import * as Users from '../../utils/users'

interface SearchUserModalProps {
	onClose: () => void
}

const SearchUserModal: React.FC<SearchUserModalProps> = ({ onClose }) => {
	const theme = useTheme()
	const { idToken, currentUserInfo } = useAuth()
	const [searchUserId, setSearchUserId] = useState('')
	const [isSearchResultVisible, setSearchResultVisible] = useState(false)
	const [searchResult, setSearchResult] = useState<{
		name: string
		iconUrl: string
	} | null>(null)

	const handleSearchUser = async (id: string) => {
		try {
			if (id.length == 0) {
				throw Error('IDが不正です')
			}
			if (currentUserInfo?.id == id) {
				throw Error('自分と同じIDに申請を送ることはできません')
			}
			const res = await Users.getFromId(idToken!, id)
			console.log(res)
			setSearchResult({
				name: res.username,
				iconUrl: res.icon_url,
			})
			setSearchResultVisible(true)
		} catch (error) {
			console.error('検索エラー:', error)
			setSearchResult({
				name: `${error}`,
				iconUrl: 'https://example.com/user-icon.png',
			})

			setSearchResultVisible(false)
		}
	}

	async function handleSendRequest(): Promise<boolean> {
		if (!isSearchResultVisible) {
			console.log('OK')
			setSearchResult(null)
		}

		const res = await Friends.post(idToken!,searchUserId);
		console.log(res)
		if(res){
			onClose();
			return true;
		}
		return false;

	}

	const handleCloseResultModal = () => {
		setSearchResultVisible(false)
		onClose()
	}

	return searchResult ? (
		<View style={styles.container}>
			<Image
				source={{ uri: searchResult.iconUrl }}
				style={{
					width: 100,
					height: 100,
					borderRadius: 50,
				}}
			/>
			<Text style={styles.name}>{searchResult.name}</Text>
			<TouchableOpacity
				style={styles.requestButton}
				onPress={async () => {
					const res = await handleSendRequest()
				}}
			>
				<Text style={styles.buttonText}>
					{isSearchResultVisible ? '申請を送る' : 'ok'}
				</Text>
			</TouchableOpacity>
		</View>
	) : (
		<View style={styles.content}>
			<TextInput
				style={[
					styles.input,
					{
						backgroundColor: theme.inputBackground,
						color: theme.text,
						borderColor: theme.border,
					},
				]}
				placeholder="ユーザーIDを入力"
				placeholderTextColor={theme.secondary}
				value={searchUserId}
				onChangeText={setSearchUserId}
				autoCorrect={false}
				autoCapitalize="none"
			/>
			<TouchableOpacity
				style={[
					styles.searchButton,
					{ backgroundColor: theme.primary },
				]}
				onPress={async () => {
					await handleSearchUser(searchUserId)
				}}
			>
				<Text style={styles.buttonText}>検索</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.qrButton, { backgroundColor: theme.primary }]}
			>
				<Text style={styles.buttonText}>QRコードを読み込む</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		padding: 20,
		alignItems: 'center',
	},
	input: {
		width: '100%',
		padding: 10,
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 10,
	},
	searchButton: {
		width: '30%',
		padding: 7,
		borderRadius: 50,
		alignItems: 'center',
		marginBottom: 30,
	},
	qrButton: {
		width: '100%',
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
	container: {
		alignItems: 'center',
		marginBottom: 20,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
	},
	requestButton: {
		marginTop: 20,
		padding: 10,
		backgroundColor: 'green',
		borderRadius: 5,
		alignItems: 'center',
	},
})

export default SearchUserModal
