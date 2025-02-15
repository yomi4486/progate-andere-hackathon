import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import ProfileInfo from './ModalProfileInfo'
import SearchButton from './SearchUserButton'
import CommonModal from './CommonModal'
import SearchUserModal from './SearchUserModal'

interface AddFriendModalProps {
	visible: boolean
	onClose: () => void
	onAddFriend: (friendName: string) => void
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({
	visible,
	onClose,
	onAddFriend,
}) => {
	const [friendName, setFriendName] = useState('')
	const [isSearchModalVisible, setSearchModalVisible] = useState(false)

	const handleAddFriend = () => {
		onAddFriend(friendName)
		setFriendName('')
		onClose()
	}

	const handleOpenSearchModal = () => {
		setSearchModalVisible(true)
		onClose() // 既存のモーダルを閉じる
	}

	return (
		<>
			<CommonModal
				visible={visible && !isSearchModalVisible}
				onClose={onClose}
			>
				<ProfileInfo
					name="自分の名前"
					userId="ユーザーID"
					qrCode="https://example.com/qr-code.png" // QRコードのURLまたはデータ
				/>
				<SearchButton onPress={handleOpenSearchModal} />
			</CommonModal>
			<SearchUserModal
				visible={isSearchModalVisible}
				onClose={() => setSearchModalVisible(false)}
			/>
		</>
	)
}

export default AddFriendModal
