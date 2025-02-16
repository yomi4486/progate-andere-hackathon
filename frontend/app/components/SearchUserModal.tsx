import React, { useState } from 'react'
import {
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View,
} from 'react-native'
import SimpleModal from '../../components/simpleModal'
import SearchResultModal from './SearchResultModal'
import { useTheme } from './themeContext'

interface SearchUserModalProps {
	visible: boolean
	onClose: () => void
}

const SearchUserModal: React.FC<SearchUserModalProps> = ({
	visible,
	onClose,
}) => {
	const theme = useTheme()
	const [searchUserId, setSearchUserId] = useState('')
	const [isSearchResultVisible, setSearchResultVisible] = useState(false)
	const [searchResult, setSearchResult] = useState<{
		name: string
		iconUrl: string
	} | null>(null)

	const handleSearchUser = () => {
		try {
			setSearchResult({
				name: '検索結果のユーザー',
				iconUrl: 'https://example.com/user-icon.png',
			})
			setSearchResultVisible(true)
		} catch (error) {
			console.error('検索エラー:', error)
			setSearchResult({
				name: '無効なユーザーID',
				iconUrl: 'https://example.com/user-icon.png',
			})
			setSearchResultVisible(true)
		}
	}

	const handleSendRequest = () => {
		// 申請を送るロジックをここに追加
	}

	const handleCloseResultModal = () => {
		setSearchResultVisible(false)
		onClose()
	}

	return (
		<>
			<SimpleModal
				visible={visible}
				onClose={onClose}
				title="ユーザーを検索"
			>
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
						onPress={handleSearchUser}
					>
						<Text style={styles.buttonText}>検索</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.qrButton,
							{ backgroundColor: theme.primary },
						]}
					>
						<Text style={styles.buttonText}>
							QRコードを読み込む
						</Text>
					</TouchableOpacity>
				</View>
			</SimpleModal>
			{isSearchResultVisible && searchResult && (
				<SearchResultModal
					visible={isSearchResultVisible}
					onClose={handleCloseResultModal}
					user={searchResult}
					onSendRequest={handleSendRequest}
				/>
			)}
		</>
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
})

export default SearchUserModal
