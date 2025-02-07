import {z} from "zod";

export const changeFriendStatus =z.object({
    status: z.enum([
        "ACCEPTED",
        "REJECTED",
        "BLOCKED"
    ])
})