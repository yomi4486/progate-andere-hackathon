import React from 'react'
import { View, Text } from 'react-native'
import { localStyles } from '../styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import UserIcon from './UserIcon'

interface CallHistoryItemProps {
	friendName: string
	callTimestamp: string
	isOutgoing: boolean
	isCaller: boolean
	callDuration: string
}

// どっちからかけたかbooleanで受け取る
// jsonが空なら不在着信👆false

// expoのタブバーの仕様調べる
// 三項演算子： { isFlag ? 'hello world' : 'Not hello world' }

const CallHistoryItem: React.FC<CallHistoryItemProps> = ({
	friendName,
	callTimestamp,
	isOutgoing,
	isCaller,
	callDuration,
}) => {
	return (
		<View
			style={[
				localStyles.callHistoryItem,
				{ marginHorizontal: 15, padding: 15 },
			]}
		>
			<UserIcon size={65} isOnline={true} />

			<View style={localStyles.callDetails}>
				<Text style={[localStyles.friendName, { fontSize: 18 }]}>
					{friendName}
				</Text>
				<View style={localStyles.missedCallContainer}>
					<Icon
						name={isCaller ? 'call-in' : 'call-out'}
						size={18}
						color={isOutgoing ? 'red' : 'green'}
					/>
					<Text
						style={[
							localStyles.missedCallText,
							{
								color: isOutgoing ? 'red' : 'green',
								fontSize: 16,
							},
						]}
					>
						{isOutgoing ? '不在着信' : callDuration}
					</Text>
				</View>
			</View>

			<Text style={[localStyles.callTime, { fontSize: 16 }]}>
				{callTimestamp}
			</Text>
			<View style={localStyles.separator} />
		</View>
	)
}

export default CallHistoryItem
