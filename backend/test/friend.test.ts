import { describe, it, expect, beforeAll, spyOn } from 'bun:test'
import { testClient } from 'hono/testing'
import app from '../src'
import * as authModule from '../src/lib/auth'
import * as prismaModule from '../src/lib/prisma'
import { setupDatabase } from './prisma.setup'
import { PrismaClient } from '@prisma/client'

const client = testClient(app)

describe('FriendRoute API', () => {
	beforeAll(async () => {
		await setupDatabase()
		spyOn(authModule, 'jwtAuth').mockImplementation(async (token) => {
			if (token === 'valid_token1') {
				return '1' // 有効なトークンの処理
			}

			if (token === 'valid_token123') {
				return '123'
			}
			throw new Error('Invalid token') // 無効なトークン
		})

		spyOn(prismaModule, 'getPrismaClient').mockImplementation(() => {
			return new PrismaClient()
		})

		const prisma = new PrismaClient()
		await prisma.user.create({
			data: {
				id: '1',
				username: 'mono',
				icon_url: '',
				status: '',
				status_message: '',
				introduction: '',
			},
		})

		await prisma.user.create({
			data: {
				id: '123',
				username: 'yomi',
				icon_url: '',
				status: '',
				status_message: '',
				introduction: '',
			},
		})
	})

	it('should send a friend request successfully', async () => {
		const res = await client.friends[':id'].$post(
			{
				param: { id: '123' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			message: 'Friend Request Successfully',
		})
	})

	it('should return 400 if bad request', async () => {
		const res = await client.friends[':id'].$put(
			{
				param: { id: '123' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(400)
		expect(await res.json()).toEqual({
			message: 'Bad Request',
		})
	})

	it('should return 409 if request is already sent', async () => {
		const res = await client.friends[':id'].$post(
			{
				param: { id: '123' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(409)
		expect(await res.json()).toEqual({
			message: 'Already Send Request',
		})
	})

	it('should reject a friend request successfully', async () => {
		const res = await client.friends[':id'].$put(
			{
				param: { id: '1' },
				json: { status: 'REJECTED' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token123',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			message: 'Request Rejected Successfully',
		})
	})

	it('should update friend request status successfully', async () => {
		await client.friends[':id'].$post(
			{
				param: { id: '123' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)
		const res = await client.friends[':id'].$put(
			{
				param: { id: '1' },
				json: { status: 'ACCEPTED' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token123',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			message: 'Request Successfully',
		})
	})
})
