import {
	GoogleSignin,
	SignInSuccessResponse,
} from '@react-native-google-signin/google-signin'
import { createContext, useContext, useState } from 'react'
import * as userRequest from './users'
import { AppType } from '../../backend/src'
const { hc } = require('hono/dist/client') as typeof import('hono/client')
import type { InferRequestType, InferResponseType } from 'hono/client'

const client = hc<AppType>('')

export interface AuthContextType {
	user: SignInSuccessResponse | null
	idToken: string | null
	currentUserInfo: InferResponseType<typeof client.users.$get, 200> | null
	googleSignIn: () => Promise<void>
	isSetupAccount: () => Promise<boolean>
	signOut: () => Promise<void>
	updateCurrentUserInfo: (
		data: InferResponseType<typeof client.users.$get, 200>,
	) => void
	reGetIdToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<SignInSuccessResponse | null>(null)
	const [idToken, setIdToken] = useState<string | null>(null)
	const [currentUserInfo, setCurrentUserInfo] = useState<InferResponseType<
		typeof client.users.$get,
		200
	> | null>(null)
	GoogleSignin.configure({
		iosClientId:
			'165387728661-co452vd2hfojg56nnknpu9j8ddksm66l.apps.googleusercontent.com',
		webClientId:
			'165387728661-b77uchgm2s5200tebjj0cvre73omsl3j.apps.googleusercontent.com',
		offlineAccess: false,
	})

	const googleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()

			if (!userInfo.data || !userInfo.data.idToken) {
				throw new Error('Login Cancel')
			}
			setUser(userInfo)
			setIdToken(userInfo.data.idToken)
		} catch (error) {
			throw new Error('Login Unsuccessful')
		}
	}

	const updateCurrentUserInfo = (
		data: InferResponseType<typeof client.users.$get, 200>,
	): void => {
		setCurrentUserInfo(data)
	}

	const reGetIdToken = async (): Promise<void> => {
		const tokens = await GoogleSignin.getTokens()
		setIdToken(tokens.idToken)
	}

	const isSetupAccount = async (): Promise<boolean> => {
		if (!idToken) return false
		try {
			const res = await userRequest.get(idToken)
			setCurrentUserInfo(res)
			return true
		} catch (e) {
			return false
		}
	}

	const signOut = async () => {
		try {
			await GoogleSignin.signOut()
			setUser(null)
			setIdToken(null)
		} catch (error) {
			console.error('Sign out failed:', error)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				idToken,
				currentUserInfo,
				googleSignIn,
				isSetupAccount,
				signOut,
				updateCurrentUserInfo,
				reGetIdToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

// カスタムフックで `useAuth` を提供
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
