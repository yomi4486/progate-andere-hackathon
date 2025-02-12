import { z } from 'zod'

export const createUserScheme = z.object({
	username: z.string(),
	icon_url: z.string(),
	status: z.string(),
	status_message: z.string(),
	introduction: z.string(),
})

export const updateUserScheme = z.object({
	username: z.string().optional(),
	icon_url: z.string().optional(),
	status: z.string().optional(),
	status_message: z.string().optional(),
	introduction: z.string().optional(),
})
