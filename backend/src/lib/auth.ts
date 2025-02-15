import { OAuth2Client } from 'google-auth-library'
import { HTTPException } from 'hono/http-exception'

export async function jwtAuth(token: string) {
	if (process.env.NODE_ENV == 'test') {
		if (token === 'valid_token1') {
			return '1' // 有効なトークンの処理
		}

		if (token === 'valid_token123') {
			return '123'
		}

		throw new HTTPException(401, { message: 'Unauthorized' })
	} else {
		try {
			const client = new OAuth2Client()
			const clientIds = process.env.GOOGLE_CLIENT_IDs.split(',')
			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: clientIds,
			})
			const payload = ticket.getPayload()
			return payload.sub.toString()
		} catch (e) {
			if (e instanceof HTTPException) throw e
			throw new HTTPException(401, { message: 'Unauthorized' })
		}
	}
}
