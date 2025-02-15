import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'
import CommonModal from './CommonModal'
import SearchResultModal from './SearchResultModal'

interface SearchUserModalProps {
	visible: boolean
	onClose: () => void
}

const SearchUserModal: React.FC<SearchUserModalProps> = ({
	visible,
	onClose,
}) => {
	const [searchUserId, setSearchUserId] = useState('')
	const [isSearchResultVisible, setSearchResultVisible] = useState(false)
	const [searchResult, setSearchResult] = useState<{
		name: string
		iconUrl: string
	} | null>(null)

	const handleSearchUser = () => {
		console.log(`検索するユーザーID: ${searchUserId}`)
		// ユーザー検索のロジックをここに追加
		try {
			// 検索結果を設定（仮のデータを使用）
			setSearchResult({
				name: '検索結果のユーザー',
				iconUrl: 'https://example.com/user-icon.png',
			})
			setSearchResultVisible(true)
			console.log(searchResult)
		} catch (error) {
			console.error('検索エラー:', error)
			// エラーが発生しても検索結果モーダルに遷移する
			setSearchResult({
				name: '無効なユーザーID',
				iconUrl: 'https://example.com/user-icon.png',
			})
			setSearchResultVisible(true)
		}
	}

	const handleSendRequest = () => {
		console.log('申請を送るボタンが押されました')
		// 申請を送るロジックをここに追加
	}

	return (
		<>
			<CommonModal visible={visible} onClose={onClose}>
				<TextInput
					style={styles.input}
					placeholder="ユーザーIDを入力"
					value={searchUserId}
					onChangeText={setSearchUserId}
					autoCorrect={false}
					autoCapitalize="none"
				/>
				<TouchableOpacity
					style={styles.searchButton}
					onPress={handleSearchUser}
				>
					<Text style={styles.buttonText}>検索</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.qrButton}
					onPress={() =>
						console.log('QRコードを読み込むボタンが押されました')
					}
				>
					<Text style={styles.buttonText}>QRコードを読み込む</Text>
				</TouchableOpacity>

				{searchResult && isSearchResultVisible && (
					<SearchResultModal
						visible={isSearchResultVisible}
						onClose={() => setSearchResultVisible(false)}
						user={searchResult}
						onSendRequest={handleSendRequest}
					/>
				)}
			</CommonModal>
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		width: '100%',
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		marginTop: 30,
		marginBottom: 10,
	},
	searchButton: {
		width: '30%',
		padding: 7,
		backgroundColor: 'green',
		borderRadius: 50,
		alignItems: 'center',
		marginBottom: 30,
	},
	qrButton: {
		width: '100%',
		padding: 15,
		backgroundColor: 'green',
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
})

export default SearchUserModal
