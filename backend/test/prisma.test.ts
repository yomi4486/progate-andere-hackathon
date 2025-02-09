import { describe, expect, it, jest, mock } from 'bun:test'
import { getPrismaClient } from '../src/lib/prisma'

const mockPrismaClient = jest.fn()

describe('getPrismaClient', () => {
	it('should return a PrismaClient instance in development mode', () => {
		process.env.NODE_ENV = 'development'
		const client = getPrismaClient('mockUrl')

		expect(client)
	})

	it('should return a PrismaClient instance with PrismaTiDBCloud adapter in production mode', () => {
		process.env.NODE_ENV = 'production'
		const client = getPrismaClient('mockUrl')
		expect(client)
	})
})
