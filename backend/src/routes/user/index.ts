import { Hono } from 'hono'
import { getPrismaClient } from '../../lib/prisma'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import { createUserScheme, updateUserScheme } from './scheme'
import { idParamsScheme } from '../../lib/scheme'

type Bindings = {
	DATABASE_URL: string
}

export const UserRoute = new Hono<{
	Variables: { user_id: string }
	Bindings: Bindings
}>()

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
			throw new HTTPException(404, {
				message: 'User Not Found',
			})
		}

		return c.json(result)
	})

	.get(
		'/:id',
		zValidator('param', idParamsScheme, async (result) => {
			if (!result.success) {
				throw new HTTPException(400, {
					message: 'Bad Request',
				})
			}
		}),
		async (c) => {
			const prisma = getPrismaClient(process.env.DATABASE_URLL)
			const param = c.req.valid('param')

			const result = await prisma.user.findUnique({
				where: {
					id: param.id,
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
				throw new HTTPException(404, {
					message: 'User Not Found',
				})
			}

			return c.json(result)
		},
	)

	.post(
		'/',
		zValidator('json', createUserScheme, (result) => {
			if (!result.success) {
				throw new HTTPException(400, {
					message: 'Bad Request',
				})
			}
		}),
		async (c) => {
			const prisma = getPrismaClient(process.env.DATABASE_URL)
			const userId = c.get('user_id')
			const validData = c.req.valid('json')

			const result = await prisma.user.create({
				data: {
					id: userId,
					username: validData.username,
					status: validData.status,
					status_message: validData.status_message,
					introduction: validData.introduction,
					icon_url: validData.icon,
				},
			})

			return c.json(result)
		},
	)

	.put(
		'/',
		zValidator('json', updateUserScheme, async (result) => {
			if (!result.success) {
				throw new HTTPException(400, {
					message: 'Bad Request',
				})
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
				throw new HTTPException(404, {
					message: 'User Not Found',
				})
			}

			return c.json(result)
		},
	)
