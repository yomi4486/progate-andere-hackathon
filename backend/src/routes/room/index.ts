import {Hono} from "hono";
import {getPrismaClient} from "../../lib/prisma";
import {AccessToken, RoomServiceClient} from "livekit-server-sdk";

type Bindings = {
    DATABASE_URL: string
}

export const RoomRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()

.get("/:id", async (c)=>{
    const prisma = getPrismaClient()
    const userId = c.get("user_id")
    const id = c.req.param("id")

    const result = await prisma.room.findUnique({where:{id:id}})

    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: userId,
        // Token to expire after 10 minutes
        ttl: '10m',
    });

    at.addGrant({ roomJoin: true, room: result.roomname });


    return c.json({
        id: result.id,
        room_name: result.roomname,
        access_token: at.toJwt(),
        owner_id: result.owner_id,
        created_at: result.created_at,
        updated_at: result.updated_at
    })
})

.post("/", async (c)=>{
    const prisma = getPrismaClient()
    const userId = c.get("user_id")
    const json:{room_name:string} = await c.req.json()

    const result = await prisma.room.create({
        data:{
            id: crypto.randomUUID(),
            roomname:json.room_name,
            owner_id: userId,
        }
    })


    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: userId,
        // Token to expire after 10 minutes
        ttl: '10m',
    });

    at.addGrant({ roomJoin: true, room: result.roomname });

    return c.json({
        id: result.id,
        room_name: result.roomname,
        access_token: at.toJwt(),
        owner_id: result.owner_id,
        created_at: result.created_at,
        updated_at: result.updated_at
    })
})

.delete("/:id", async (c)=>{
    const prisma = getPrismaClient()
    const id = c.req.param("id")
    const user_id = c.get("user_id")

    const result = await prisma.room.findUnique({
        where:{
            id:id,
            owner_id:user_id
        }
    })

    await prisma.room.delete({
        where:{
            id: id,
            owner_id :user_id
        }
    })

    const roomService = new RoomServiceClient(process.env.LIVEKIT_HOST, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET);
    await roomService.deleteRoom(result.roomname)

    return c.json({message:"success"})
})