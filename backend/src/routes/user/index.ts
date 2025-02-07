import {Hono} from "hono";
import {getPrismaClient} from "../../lib/prisma";

type Bindings = {
    DATABASE_URL: string
}


export const UserRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()

.get("/",async (c)=>{
    const prisma = getPrismaClient()
    const userId = c.get("user_id")

    const result = await prisma.user.findUnique({where:{id:userId}})

    return c.json(result)
})

.get("/:id",async (c)=>{
    const prisma = getPrismaClient()
    const id = c.req.param("id")

    const result = await prisma.user.findUnique({where:{id:id}})

    return c.json(result)
})

.put("/",async (c)=>{
    const prisma = getPrismaClient()
    const userId = c.get("user_id")

    const result =  await prisma.user.update({
        where: { id: userId },
        data: {},
    });

    return c.json(result)
})