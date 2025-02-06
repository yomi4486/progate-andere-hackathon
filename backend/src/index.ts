import {Hono} from "hono";
import {HTTPException} from "hono/http-exception";
import {ZodError} from "zod";
import {jwtAuth} from "./lib/auth";

type Bindings = {
    DATABASE_URL: string
}

const app = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()
.get((c)=>{
    return c.json({status:"success"})
})
.get("/test",(c)=>{
    return c.json({status:"success"})
})

app.use("*",async (c, next) => {
    if (c.req.path.includes("/webhook")) return await next();

    let token = c.req.header("Authorization")
    if (!token) throw new HTTPException(401,{message:"Unauthorized"});

    token = token.split(" ")[1];
    let user_id = await jwtAuth(token);

    c.set("user_id",user_id);
    await next();
})


app.onError((e,c) => {
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

export type IndexAppRoute = typeof app