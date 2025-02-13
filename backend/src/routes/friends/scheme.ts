import { z } from 'zod'

export const FriendStatus = z.object({
	status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED']),
})
