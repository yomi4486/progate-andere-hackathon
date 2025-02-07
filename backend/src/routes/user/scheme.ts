import {z} from "zod";

export const updateUserScheme = z.object({
    id: z.string().nullable(),
    username: z.string().nullable(),
    icon: z.string().nullable(),
    status: z.string().nullable(),
    status_message: z.string().nullable(),
    introduction: z.string().nullable(),
})