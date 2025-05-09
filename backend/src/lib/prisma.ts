import { PrismaClient } from '@prisma/client'
import { connect } from '@tidbcloud/serverless'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

export function getPrismaClient(url: string): PrismaClient {
	if (process.env.NODE_ENV != 'development') {
		const connection = connect({ url })
		const adapter = new PrismaTiDBCloud(connection)

		return new PrismaClient({ adapter })
	} else {
		return new PrismaClient()
	}
}
