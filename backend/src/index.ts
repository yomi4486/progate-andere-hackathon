import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import * as authModule from './lib/auth'
import { UserRoute } from './routes/user'
import { RoomRoute } from './routes/room'
import { FriendRoute } from './routes/friends'
import { HttpFunction } from '@google-cloud/functions-framework'
import { Prisma } from '@prisma/client'

const app = new Hono<{ Variables: { user_id: string } }>()
	.use('*', async (c, next) => {
		let token = c.req.header('Authorization')
		if (!token) return c.json({ message: 'Unauthorized' }, 401)
		token = token.split(' ')[1]

		const user_id = await authModule.jwtAuth(token)
		if (!user_id) return c.json({ message: 'Unauthorized' }, 401)

		c.set('user_id', user_id)
		await next()
	})

	.get('/', (c) => {
		return c.json({ status: 'success' })
	})

	.route('/users', UserRoute)
	.route('/rooms', RoomRoute)
	.route('/friends', FriendRoute)

	.onError((e, c) => {
		if (e instanceof HTTPException)
			return c.json({ message: e.message }, e.status)
		if (e instanceof ZodError) return c.json({ message: e.message }, 400)

		if (e instanceof Prisma.PrismaClientValidationError)
			return c.json({ message: e.message }, 400)
		if (e instanceof Prisma.PrismaClientInitializationError)
			return c.json({ message: e.message }, 500)
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return c.json({ message: e.message }, 500)
		if (e instanceof Prisma.PrismaClientRustPanicError)
			return c.json({ message: e.message }, 500)
		if (e instanceof Prisma.PrismaClientUnknownRequestError)
			return c.json({ message: e.message }, 500)

		return c.json({ message: 'Internal Server Error' }, 500)
	})

export type AppType = typeof app
export default app

export const mainFunction: HttpFunction = async (req, resp) => {
	const url = new URL(`${req.protocol}://${req.hostname}${req.url}`)

	const headers = new Headers()
	Object.keys(req.headers).forEach((k) => {
		headers.set(k, req.headers[k] as string)
	})

	const body = req.body
	const newRequest = ['GET', 'HEAD'].includes(req.method)
		? new Request(url, {
				headers,
				method: req.method,
			})
		: new Request(url, {
				headers,
				method: req.method,
				body: Buffer.from(
					typeof body === 'string'
						? body
						: JSON.stringify(body || {}),
				),
			})

	const res = await app.fetch(newRequest)

	if (res.status == 404) {
		resp.status(res.status)
		return resp.json({ message: 'Not Found' })
	}

	resp.status(res.status)
	return resp.json(await res.json())
}
