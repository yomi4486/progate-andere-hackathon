import { AppType } from '../../backend/src'
// eslint-disable-next-line
const { hc } = require('hono/dist/client') as typeof import('hono/client')
import type { InferRequestType, InferResponseType } from 'hono/client'
const base_url: string = `${process.env.EXPO_PUBLIC_BASE_URL}`
const client = hc<AppType>(base_url)

// 自分のユーザーを取得
export async function get(
	idToken: string | undefined,
): Promise<InferResponseType<typeof client.users.$get, 200>> {
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
			return json
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
