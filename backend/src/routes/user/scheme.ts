import {z} from "zod";

export const createUserScheme = z.object({
    id: z.string(),
    username: z.string(),
    icon: z.string(),
    status: z.string(),
    status_message: z.string(),
    introduction: z.string(),
})

export const updateUserScheme = z.object({
    id: z.string().optional(),
    username: z.string().optional(),
    icon: z.string().optional(),
    status: z.string().optional(),
    status_message: z.string().optional(),
    introduction: z.string().optional(),
})