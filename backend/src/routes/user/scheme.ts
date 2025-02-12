import { z } from 'zod'

export const createUserScheme = z.object({
	username: z.string(),
	icon_url: z.string(),
	status: z.string(),
	status_message: z.string(),
	introduction: z.string(),
})

export const updateUserScheme = z.object({
	username: z.string().nullish(),
	icon_url: z.string().nullish(),
	status: z.string().nullish(),
	status_message: z.string().nullish(),
	introduction: z.string().nullish(),
})
