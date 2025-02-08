import { execSync } from 'child_process'
import { createConnection } from 'mysql2/promise'

/**
 * JEST_WORKDER_ID毎にDatabaseを作成し、データのリセット処理を行う。
 */
export async function setupDatabase() {
	await sleep(5000)
	const newDbName = `worker_${generateRandomString(10)}`

	// mysql2/promiseを使って非同期対応の接続を行います。
	const connection = await createConnection({
		host: 'localhost',
		user: 'root',
		password: 'mysql',
		port: 4000,
	})

	// DBの削除と作成を待機します
	await connection.execute(`DROP DATABASE IF EXISTS ${newDbName}`)
	await connection.execute(`CREATE DATABASE ${newDbName}`)
	process.env.DATABASE_URL = `mysql://root:mysql@localhost:4000/${newDbName}`

	// Prismaを同期的に実行
	execSync(
		'npx prisma db push --accept-data-loss --skip-generate --force-reset',
		{
			env: {
				...process.env,
			},
		},
	)
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

function generateRandomString(length: number): string {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length)
		result += characters[randomIndex]
	}
	return result
}
