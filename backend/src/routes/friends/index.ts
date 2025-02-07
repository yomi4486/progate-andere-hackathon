import {getPrismaClient} from "../../lib/prisma";
import {Hono} from "hono";
import {HTTPException} from "hono/http-exception";
import {zValidator} from "@hono/zod-validator";
import {changeFriendStatus} from "./scheme";

type Bindings = {
    DATABASE_URL: string
}

export const FriendRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()
.post("/:id",async (c)=>{
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const userId = c.get("user_id")
    const id = c.req.param("id")

    if(userId == id){
        throw new HTTPException(400,{message:"Can't Send Friend Request"})
    }

    const result = await prisma.friends.findFirst({
        where:{
            from_id: userId,
            to_id:id
        }
    })

    if (result) {
        throw new HTTPException(409,{message:"Already Send Request"})
    }

    await prisma.friends.create({
        data:{
            from_id:userId,
            to_id: id,
            status: "PENDING"
        }
    })

    return c.json({message:"Friend Request Successfully"},200)
})

.put("/:id",
    zValidator("json", changeFriendStatus, (result) => {
        if (!result.success) {
            throw new HTTPException(400,{message:"Bad Request"})
        }
    }),

    async (c)=>{
        const prisma = getPrismaClient(c.env.DATABASE_URL)
        const userId = c.get("user_id")
        const id = c.req.param("id")
        const json = c.req.valid("json")

        if (json.status == "REJECTED") {
            await prisma.friends.delete({
                where:{
                    from_id_to_id:{
                        from_id:userId,
                        to_id: id
                    }
                }
            })

            return c.json({message:"Request Rejected Successfully"},200)
        }

        await prisma.friends.update({
            where:{
                from_id_to_id: {
                    from_id: userId,
                    to_id:id
                }
            },
            data:{
                status: json.status,
            }
        })

        return c.json({message:"Request Successfully"},200)
    }
)