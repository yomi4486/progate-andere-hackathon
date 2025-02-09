import { describe, it, expect, beforeAll, spyOn } from 'bun:test'
import { testClient } from 'hono/testing'
import app from '../src'
import * as authModule from '../src/lib/auth'
import * as prismaModule from '../src/lib/prisma'
import { setupDatabase } from './prisma.setup'
import { PrismaClient } from '@prisma/client'

const client = testClient(app)

describe('UserRoute API', () => {
	beforeAll(async () => {
		await setupDatabase()
		spyOn(authModule, 'jwtAuth').mockImplementation(async (token: string) => {
			if (token === 'valid_token1') return '1';
			if (token === 'valid_token123') return '123';
			throw new Error('Invalid token');
		});

		spyOn(prismaModule, 'getPrismaClient').mockImplementation(() => {
			return new PrismaClient()
		})

		const prisma = new PrismaClient()
		await prisma.user.create({
			data: {
				id: '1',
				username: 'mono',
				icon_url: '',
				status: 'active',
				status_message: 'Hello!',
				introduction: 'I am a developer.',
			},
		})
	})

	it('should fetch the current user details successfully', async () => {
		const res = await client.users.$get(
			{},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({
			id: '1',
			username: 'mono',
			icon_url: '',
			status: 'active',
			status_message: 'Hello!',
			introduction: 'I am a developer.',
			from_users: [],
			to_users: [],
		})
	})

	it('should fetch user details by id successfully', async () => {
		const res = await client.users[':id'].$get(
			{
				param: { id: '1' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual(expect.objectContaining({
			id: '1',
			username: 'mono',
			icon_url: '',
			status: 'active',
			status_message: 'Hello!',
			introduction: 'I am a developer.',
			from_users: [],
			to_users: [],
		}))
	})

	it('should return 400 if user id is not found in param', async () => {
		const res = await client.users[':id'].$get(
			{
				param: { id: '999' },
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(404)
		expect(await res.json()).toEqual({ message: 'User Not Found' })
	})

	it('should register a new user successfully', async () => {
		const newUserData = {
			username: 'newuser',
			status: 'active',
			status_message: 'New user',
			introduction: 'This is a new user.',
			icon_url: 'icon_url',
		}

		const res = await client.users.$post(
			{
				json: newUserData,
			},
			{
				headers: {
					Authorization: 'Bearer valid_token123',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual(expect.objectContaining({
			id: '123',
			username: 'newuser',
			icon_url: 'icon_url',
			status: 'active',
			status_message: 'New user',
			introduction: 'This is a new user.',
		}))
	})

	it('should return 409 if user already exists', async () => {
		const newUserData = {
			username: 'mono',
			status: 'active',
			status_message: 'Hello!',
			introduction: 'I am a developer.',
			icon_url: 'icon_url',
		}

		const res = await client.users.$post(
			{
				json: newUserData,
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(409)
		expect(await res.json()).toEqual({ message: 'already Register' })
	})

	it('should update user details successfully', async () => {
		const res = await client.users.$put(
			{
				json: {
					username: "newuser",
					icon_url: 'new_icon_url',
					status: 'inactive',
					status_message: 'Updated status',
					introduction: 'Updated introduction.'
				}
			},
			{
				headers: {
					Authorization: 'Bearer valid_token1',
				},
			},
		)

		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({message:"User Update Successfully"});
	})
})
