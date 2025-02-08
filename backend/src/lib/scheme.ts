import {z} from "zod"
export const idParamsScheme = z.object({
    id: z.string()
})

export const headerScheme = z.object({
    Authorization: z.string()
})