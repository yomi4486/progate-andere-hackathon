import { z } from 'zod'

export const createUserScheme = z.object({
	username: z.string(),
	icon_url: z.string(),
	status: z.string(),
	status_message: z.string(),
	introduction: z.string(),
})

export const updateUserScheme = z.object({
	username: z.string().nullable(),
	icon_url: z.string().nullable(),
	status: z.string().nullable(),
	status_message: z.string().nullable(),
	introduction: z.string().nullable(),
})
