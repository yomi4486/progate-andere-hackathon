import {Hono} from "hono";
import {HTTPException} from "hono/http-exception";
import {ZodError} from "zod";
import {jwtAuth} from "./lib/auth";
import {UserRoute} from "./routes/user";
import {RoomRoute} from "./routes/room";
import {kindeRoute} from "./routes/webhook";
import {FriendRoute} from "./routes/friends";
import {WsRoute} from "./routes/websocket";

type Bindings = {
    DATABASE_URL: string
}

const app = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()
.use("*",async (c, next) => {
    let token = c.req.header("Authorization")
    if (!token) throw new HTTPException(401,{message:"Unauthorized"});

    token = token.split(" ")[1];
    let user_id = await jwtAuth(token);

    c.set("user_id",user_id);
    await next();
})

.get((c)=>{
    return c.json({status:"success"})
})

.route("/users",UserRoute)
.route("/rooms",RoomRoute)
.route("/webhook",kindeRoute)
.route("/friends",FriendRoute)
.route("/websocket",WsRoute)

.onError((e,c) => {
    if (e instanceof HTTPException) return c.json({message: e.message},e.status);
    if (e instanceof ZodError) return c.json({message: e.message},400)
    /*
    if (e instanceof Prisma.PrismaClientValidationError) return c.json({message: e.message},400);
    if (e instanceof Prisma.PrismaClientInitializationError) return c.json({message: e.message},500);
    if (e instanceof Prisma.PrismaClientKnownRequestError) return c.json({message: e.message},500);
    if (e instanceof Prisma.PrismaClientRustPanicError) return c.json({message: e.message},500);
    if (e instanceof Prisma.PrismaClientUnknownRequestError) return c.json({message: e.message},500);
     */

    return c.json({message: "Internal Server Error"}, 500);
})

export default app;
export type AppType = typeof app