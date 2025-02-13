import { Hono } from 'hono'
import { getPrismaClient } from '../../lib/prisma'
import { zValidator } from '@hono/zod-validator'
import { createUserScheme, updateUserScheme } from './scheme'

export const UserRoute = new Hono<{
	Variables: { user_id: string }
}>()
	//https://localhost/users/
	.get('/', async (c) => {
		const prisma = getPrismaClient(process.env.DATABASE_URL)
		const userId = c.get('user_id')

		const result = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
				username: true,
				icon_url: true,
				status: true,
				status_message: true,
				introduction: true,
				from_users: {
					where: {
						status: 'ACCEPTED',
					},
					select: {
						from_user: {
							select: {
								id: true,
								icon_url: true,
								status: true,
							},
						},
					},
				},
				to_users: {
					where: {
						status: 'ACCEPTED',
					},
					select: {
						to_user: {
							select: {
								id: true,
								icon_url: true,
								status: true,
							},
						},
					},
				},
			},
		})

		if (!result) {
			return c.json({ message: 'User Not Found' }, 404)
		}

		return c.json(result)
	})

	//https://localhost/users/userid
	.get('/:id', async (c) => {
		const prisma = getPrismaClient(process.env.DATABASE_URLL)
		const id = c.req.param('id')

		const result = await prisma.user.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				username: true,
				icon_url: true,
				status: true,
				status_message: true,
				introduction: true,
				from_users: {
					where: {
						status: 'ACCEPTED',
					},
					select: {
						from_user: {
							select: {
								id: true,
								icon_url: true,
								status: true,
							},
						},
					},
				},
				to_users: {
					where: {
						status: 'ACCEPTED',
					},
					select: {
						to_user: {
							select: {
								id: true,
								icon_url: true,
								status: true,
							},
						},
					},
				},
			},
		})

		if (!result) {
			return c.json({ message: 'User Not Found' }, 404)
		}

		return c.json(result)
	})

	.post(
		'/',
		zValidator('json', createUserScheme, async (result, c) => {
			if (!result.success) {
				return c.json({ message: 'Bad Request' }, 400)
			}
		}),
		async (c) => {
			const prisma = getPrismaClient(process.env.DATABASE_URL)
			const userId = c.get('user_id')
			const validData = c.req.valid('json')

			const query = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			})

			if (query) return c.json({ message: 'already Register' }, 409)

			const result = await prisma.user.create({
				data: {
					id: userId,
					username: validData.username,
					status: validData.status,
					status_message: validData.status_message,
					introduction: validData.introduction,
					icon_url: validData.icon_url,
				},
			})

			return c.json(result)
		},
	)

	.put(
		'/',
		zValidator('json', updateUserScheme, async (result, c) => {
			if (!result.success) {
				return c.json({ message: 'Bad Request' }, 400)
			}
		}),
		async (c) => {
			const prisma = getPrismaClient(process.env.DATABASE_URL)
			const userId = c.get('user_id')
			const validData = c.req.valid('json')

			const result = await prisma.user.update({
				where: { id: userId },
				data: validData,
			})

			if (!result) {
				return c.json({ message: 'User Not Found' }, 404)
			}

			return c.json(result, 200)
		},
	)
