import { Hono } from 'hono'
import { getPrismaClient } from '../../lib/prisma'
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk'
import { zValidator } from '@hono/zod-validator'
import { createRoomScheme } from './scheme'

export const RoomRoute = new Hono<{
	Variables: { user_id: string }
}>()

	.get(
		'/:id',

		async (c) => {
			const prisma = getPrismaClient(process.env.DATABASE_URL)
			const userId = c.get('user_id')
			const id = c.req.param('id')

			const result = await prisma.room.findUnique({
				where: {
					id: id,
				},
			})

			if (!result) {
				return c.json({ message: 'Room Not Found' }, 404)
			}

			const at = new AccessToken(
				process.env.LIVEKIT_API_KEY,
				process.env.LIVEKIT_API_SECRET,
				{
					identity: userId,
					// Token to expire after 10 minutes
					ttl: '10m',
				},
			)

			at.addGrant({ roomJoin: true, room: result.roomname })

			return c.json({
				id: result.id,
				room_name: result.roomname,
				access_token: await at.toJwt(),
				owner_id: result.owner_id,
				created_at: result.created_at,
				updated_at: result.updated_at,
			})
		},
	)

	.post(
		'/',
		zValidator('json', createRoomScheme, (result, c) => {
			if (!result.success) {
				return c.json({ message: 'Bad Request' }, 400)
			}
		}),

		async (c) => {
			const prisma = getPrismaClient(process.env.DATABASE_URL)
			const userId = c.get('user_id')
			const validData = c.req.valid('json')

			const result = await prisma.room.create({
				data: {
					id: crypto.randomUUID(),
					roomname: validData.room_name,
					owner_id: userId,
				},
			})

			const at = new AccessToken(
				process.env.LIVEKIT_API_KEY,
				process.env.LIVEKIT_API_SECRET,
				{
					identity: userId,
					// Token to expire after 10 minutes
					ttl: '10m',
				},
			)

			at.addGrant({ roomJoin: true, room: result.roomname })

			return c.json({
				id: result.id,
				room_name: result.roomname,
				access_token: await at.toJwt(),
				owner_id: result.owner_id,
				created_at: result.created_at,
				updated_at: result.updated_at,
			})
		},
	)

	.delete(
		'/:id',

		async (c) => {
			const prisma = getPrismaClient(process.env.DATABASE_URL)
			const id = c.req.param('id')
			const user_id = c.get('user_id')

			const result = await prisma.room.findUnique({
				where: {
					id: id,
					owner_id: user_id,
				},
			})

			if (!result) {
				if (!result) {
					return c.json({ message: 'Room Not Found' }, 404)
				}
			}

			await prisma.room.delete({
				where: {
					id: id,
					owner_id: user_id,
				},
			})

			const roomService = new RoomServiceClient(
				process.env.LIVEKIT_HOST,
				process.env.LIVEKIT_API_KEY,
				process.env.LIVEKIT_API_SECRET,
			)

			await roomService.deleteRoom(result.roomname)

			return c.json({ message: 'Room Delete Successfully' }, 200)
		},
	)
