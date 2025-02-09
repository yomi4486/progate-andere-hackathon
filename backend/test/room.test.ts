import { describe, it, expect, beforeAll, spyOn, mock, jest } from 'bun:test'
import { testClient } from 'hono/testing'
import app from '../src'
import * as authModule from '../src/lib/auth'
import * as prismaModule from '../src/lib/prisma'
import { setupDatabase } from './prisma.setup'
import { PrismaClient } from '@prisma/client'

const client = testClient(app)

describe('RoomRoute API', () => {
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

		mock.module('livekit-server-sdk', () => {
			return {
				AccessToken: jest.fn().mockImplementation(() => ({
					addGrant: jest.fn(),
					toJwt: jest.fn().mockResolvedValue('jwt-token'),
				})),
				RoomServiceClient: jest.fn().mockImplementation(() => ({
					deleteRoom: jest.fn().mockResolvedValue(undefined),
				})),
			}
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

		await prisma.room.create({
			data: {
				id: '1',
				roomname: 'room1',
				owner_id: '1',
			},
		})
	})

	it('GET /:id should return room details with access token', async () => {
		const res = await client.rooms[':id'].$get(
			{
				param: {
					id: '1',
				},
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			id: '1',
			room_name: 'room1',
			access_token: 'jwt-token',
			owner_id: '1',
			created_at: expect.any(String),
			updated_at: expect.any(String),
		})
	})

	it('GET /:id should return 404 if room not found', async () => {
		const res = await client.rooms[':id'].$get(
			{
				param: {
					id: 'invalidId',
				},
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(404)
		expect(await res.json()).toEqual({
			message: 'Room Not Found',
		})
	})

	it('POST / should create a room and return access token', async () => {
		const res = await client.rooms.$post(
			{
				json: {
					room_name: 'validName',
				},
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			id: expect.any(String),
			room_name: 'validName',
			access_token: 'jwt-token',
			owner_id: '1',
			created_at: expect.any(String),
			updated_at: expect.any(String),
		})
	})

	it('POST / should return 400 if bad request', async () => {
		const res = await client.rooms.$post(
			{
				json: {},
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(400)

		// @ts-ignore
		expect(await res.json()).toEqual({ message: 'Bad Request' })
	})

	it('DELETE /:id should remove the room if user is owner', async () => {
		const res = await client.rooms[':id'].$delete(
			{
				param: {
					id: '1',
				},
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			message: 'Room Delete Successfully',
		})
	})

	it('DELETE /:id should remove the room if user is not owner', async () => {
		const res = await client.rooms[':id'].$delete(
			{
				param: {
					id: 'room1',
				},
			},
			{
				headers: {
					Authorization: 'Bearer valid_token123',
				},
			},
		)

		expect(res.status).toBe(404)
		expect(await res.json()).toEqual({
			message: 'Room Not Found',
		})
	})
})
