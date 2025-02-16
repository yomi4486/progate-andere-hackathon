import { AppType } from '../../backend/src'
// eslint-disable-next-line
const { hc } = require('hono/dist/client') as typeof import('hono/client')
import type { InferRequestType, InferResponseType } from 'hono/client'
const base_url: string = `${process.env.EXPO_PUBLIC_BASE_URL}`
const client = hc<AppType>(base_url)

type User = {
	status: string
	id: string
	username: string
	icon_url: string
	status_message: string
}

export type ExtendedUserResponse = InferResponseType<
	typeof client.users.$get,
	200
> & {
	friends: User[]
}
// 自分のユーザーを取得
export async function get(
	idToken: string | undefined,
): Promise<ExtendedUserResponse> {
	if (idToken) {
		const result = await client.users.$get(
			{},
			{
				headers: {
					Authorization: `Beaner ${idToken}`,
				},
			},
		)
		if (result.ok) {
			const json = await result.json()
			const mergeFriends = mergeUsers(json.to_users, json.from_users)

			return { ...json, friends: mergeFriends }
		} else {
			throw Error('Fetch to Server')
		}
	} else {
		throw Error('idToken is undefind')
	}
}

export async function post(
	data: InferRequestType<typeof client.users.$post>['json'],
	idToken: string | undefined,
): Promise<InferResponseType<typeof client.users.$post, 200> | null> {
	if (idToken) {
		try {
			const res = await client.users.$post(
				{
					json: data,
				},
				{
					headers: {
						Authorization: `Beaner ${idToken}`,
					},
				},
			)
			if (!res.ok) throw Error('request failed')
			const json = await res.json()
			return json
		} catch (e) {
			console.error(e)
			return null
		}
	} else {
		throw Error('idToken is undefined')
	}
}

export async function put(
	data: InferRequestType<typeof client.users.$put>['json'],
	idToken: string | undefined,
): Promise<InferResponseType<typeof client.users.$put, 200> | null> {
	if (idToken) {
		try {
			const res = await client.users.$put(
				{
					json: data,
				},
				{
					headers: {
						Authorization: `Beaner ${idToken}`,
					},
				},
			)
			if (!res.ok) throw Error('request failed')
			const json = await res.json()
			return json
		} catch (e) {
			console.error(e)
			return null
		}
	} else {
		throw Error('idToken is undefined')
	}
}

type ToUser = { from_user: User }
type FromUser = { to_user: User }

function mergeUsers(to_users: ToUser[], from_users: FromUser[]): User[] {
	const userMap = new Map<string, User>()

	// to_users のデータを追加
	for (const entry of to_users) {
		userMap.set(entry.from_user.id, entry.from_user)
	}

	// from_users のデータを追加（既にある場合は無視）
	for (const entry of from_users) {
		if (!userMap.has(entry.to_user.id)) {
			userMap.set(entry.to_user.id, entry.to_user)
		}
	}

	// Map の値をリスト化して返す
	return Array.from(userMap.values())
}

const getObj = client.users[':id'].$get
export async function getFromId(
	idToken: string | undefined,
	id: string,
): Promise<InferResponseType<typeof getObj, 200>> {
	if (idToken) {
		const result = await client.users[':id'].$get(
			{ param: { id: id } },
			{
				headers: {
					Authorization: `Beaner ${idToken}`,
				},
			},
		)
		if (result.ok) {
			const json = await result.json()
			const mergeFriends = mergeUsers(json.to_users, json.from_users)

			return json
		} else {
			throw Error('Fetch to Server')
		}
	} else {
		throw Error('idToken is undefind')
	}
}
