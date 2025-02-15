import { AppType } from '../../backend/src'
// eslint-disable-next-line
const { hc } = require('hono/dist/client') as typeof import('hono/client')
import type { InferResponseType, InferRequestType } from 'hono/client'

const base_url: string = `${process.env.EXPO_PUBLIC_BASE_URL}`
const client = hc<AppType>(base_url)
// eslint-disable-next-line
const idFriend = client.friends[':id']

export async function post(
	idToken: string,
	id: string,
): Promise<InferResponseType<typeof idFriend.$post, 200> | null> {
	if (idToken) {
		try {
			const res = await client.friends[':id'].$post(
				{
					param: {
						id: id,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				},
			)

			const json = await res.json()
			return json
		} catch {
			throw Error('Fetch Error')
		}
	} else {
		throw Error('idToken is undefined')
	}
}

export async function put(
	idToken: string,
	id: string,
	status: InferRequestType<typeof idFriend.$put>['json'],
) {
	if (idToken) {
		try {
			const res = await client.friends[':id'].$put(
				{
					param: {
						id: id,
					},
					json: status,
				},
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				},
			)

			const json = await res.json()
			return json
		} catch {
			throw Error('Fetch Error')
		}
	} else {
		throw Error('idToken is undefined')
	}
}
