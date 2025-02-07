import {Hono} from "hono";
import {getPrismaClient} from "../../lib/prisma";
import {HTTPException} from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import {updateUserScheme} from "./scheme";

type Bindings = {
    DATABASE_URL: string
}

export const UserRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()

.get("/",
    async(c)=>{
        const prisma = getPrismaClient(c.env.DATABASE_URL)
        const userId = c.get("user_id")

        const result = await prisma.user.findUnique(
            {
                where:{
                    id:userId
                },
                select:{
                    id:true,
                    uuid:true,
                    username:true,
                    icon_url:true,
                    status:true,
                    status_message:true,
                    introduction:true,
                    from_users:{
                        select:{
                            from_user:{
                                select:{
                                    id:true,
                                    uuid:true,
                                    icon_url:true,
                                    status:true,
                                }
                            }
                        }
                    },
                    to_users:{
                        select:{
                            to_user:{
                                select:{
                                    id:true,
                                    uuid:true,
                                    icon_url:true,
                                    status:true,
                                }
                            }
                        }
                    }
                }
            },
        )

        return c.json(result)
    }
)

.get("/:id",
    async (c)=>{
        const prisma = getPrismaClient(c.env.DATABASE_URL)
        const id = c.req.param("id")

        const result = await prisma.user.findUnique(
            {
                where:{
                    id:id
                },
                select:{
                    id:true,
                    uuid:true,
                    username:true,
                    icon_url:true,
                    status:true,
                    status_message:true,
                    introduction:true,
                    from_users:{
                        select:{
                            from_user:{
                                select:{
                                    id:true,
                                    uuid:true,
                                    icon_url:true,
                                    status:true,
                                }
                            }
                        }
                    },
                    to_users:{
                        select:{
                            to_user:{
                                select:{
                                    id:true,
                                    uuid:true,
                                    icon_url:true,
                                    status:true,
                                }
                            }
                        }
                    }
                }
            },
        )

        return c.json(result)
    }
)

.put("/",
    zValidator("json", updateUserScheme, (result) => {
        if (!result.success) {
            throw new HTTPException(400,{message:"Bad Request"})
        }
    }),

    async (c)=> {
        const prisma = getPrismaClient(c.env.DATABASE_URL)
        const userId = c.get("user_id")
        const validData = c.req.valid("json")

        const result = await prisma.user.update({
            where: {id: userId},
            data: validData,
        });

        return c.json(result)
    }
)