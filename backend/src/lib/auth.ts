import { OAuth2Client } from 'google-auth-library'
import { HTTPException } from 'hono/http-exception'

export async function jwtAuth(token: string) {
	try {
		const client = new OAuth2Client()
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		})
		const payload = ticket.getPayload()
		return payload.sub.toString()
	} catch (e) {
		if (e instanceof HTTPException) throw e
		throw new HTTPException(401, { message: 'Unauthorized' })
	}
}
