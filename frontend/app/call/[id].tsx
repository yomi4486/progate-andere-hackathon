import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import {
	AudioSession,
	LiveKitRoom,
	useRoomContext,
} from '@livekit/react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import * as RoomService from '../../utils/room'
import { useAuth } from '../../utils/authContext'

const CallScreen: React.FC = () => {
	const { id } = useLocalSearchParams()
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const { user } = useAuth()

	useEffect(() => {
		const start = async () => {
			const data = await RoomService.get(
				user!.data.idToken as string,
				id as string,
			)
			setAccessToken(data.access_token)
			await AudioSession.startAudioSession()
		}

		start()
		return () => {
			AudioSession.stopAudioSession()
		}
	}, [])

	return (
		<View style={styles.container}>
			{accessToken ? (
				<LiveKitRoom
					serverUrl="wss://qwet-dev-cyhgi9fp.livekit.cloud"
					token={accessToken}
					connect={true}
					audio={true}
					style={{ flex: 1 }}
				>
					<Screen />
				</LiveKitRoom>
			) : (
				<Text>読み込み中...</Text>
			)}
		</View>
	)
}

function Screen() {
	const room = useRoomContext()
	const [mic, setMic] = useState(true)
	const router = useRouter()
	const { user } = useAuth()
	const [userData, setUserData] = useState<{
		id: string
		username: string
		icon_url: string
	} | null>(null)

	type UserNameData = {
		id: string
		username: string
		icon_url: string
	}

	const userNameData: UserNameData = {
		id: user!.data.user.id,
		username: user!.data.user.name!,
		icon_url: user!.data.user.photo!,
	}

	setInterval(() => {
		const encoder = new TextEncoder()
		const data = encoder.encode(JSON.stringify(userNameData))
		room.localParticipant.publishData(data, { reliable: false })
	}, 3000)

	room.on('dataReceived', (payload: Uint8Array) => {
		const decoder = new TextDecoder()
		const strData = decoder.decode(payload)
		const data = JSON.parse(strData) as UserNameData
		if (data.username || data.id != user!.data.user.id) {
			setUserData({
				username: data.username,
				icon_url: data.icon_url,
				id: data.id,
			})
		}
	})

	return (
		<View style={styles.screenContainer}>
			{/* 上部ヘッダー */}
			<View style={styles.header}></View>

			{/* プロフィール画像とタイマー */}
			<View style={styles.profileContainer}>
				{userData ? (
					<View style={styles.profileContainer}>
						<Image
							source={{ uri: userData.icon_url }}
							style={styles.avatar}
						/>
						<Text style={styles.userName}>{userData.username}</Text>
					</View>
				) : (
					<Text style={styles.userName}>接続待機中...</Text>
				)}
				<View style={styles.audioWave} />
			</View>

			{/* 通話操作ボタン */}
			<View style={styles.controlContainer}>
				<TouchableOpacity
					onPress={() => {
						setMic((prev) => !prev)
						room.localParticipant.setMicrophoneEnabled(!mic)
					}}
				>
					<Icon
						name={mic ? 'microphone' : 'microphone-slash'}
						size={30}
						color="black"
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name="comment" size={30} color="black" />
				</TouchableOpacity>
				<TouchableOpacity>
					<Icon name="volume-up" size={30} color="black" />
				</TouchableOpacity>
			</View>

			{/* 通話終了ボタン */}
			<TouchableOpacity
				style={styles.endCallButton}
				onPress={() => {
					room.disconnect()
					router.push('/(tabs)')
				}}
			>
				<Icon name="times" size={40} color="white" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		width: '100%',
	},
	screenContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
	},
	header: {
		width: '100%',
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'gray',
		alignItems: 'center',
	},
	userName: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
	},
	timer: {
		fontSize: 16,
		color: 'gray',
		marginVertical: 5,
	},
	audioWave: {
		width: 50,
		height: 10,
		backgroundColor: 'green',
		borderRadius: 5,
		marginTop: 10,
	},
	controlContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '60%',
		marginBottom: 100,
	},
	endCallButton: {
		backgroundColor: 'red',
		width: 70,
		height: 70,
		borderRadius: 35,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
})

export default CallScreen
