import { z } from 'zod'

export const createRoomScheme = z.object({
	room_name: z.string(),
})
