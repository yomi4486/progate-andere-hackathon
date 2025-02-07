import {z} from "zod"
export const idParamsScheme = z.object({
    id: z.string()
})