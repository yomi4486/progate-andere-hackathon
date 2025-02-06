import {Hono} from "hono";
import {decodeWebhook} from "@kinde/webhooks";


export const kindeRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>();

type Bindings = {
    DATABASE_URL: string
}

kindeRoute.post("/kinde",async (c) => {
    const body = await c.req.text();
    //const prisma = getPrismaClient(c.env?.DATABASE_URL);
    const decodedWebhook = await decodeWebhook(body);

    if (decodedWebhook && decodedWebhook.type === "user.created") {
        /*
        await prisma.user.create({
            data:{
                id:decodedWebhook.data.user.id,
                username:decodedWebhook.data.user.username,
                icon_url:"",
                status:""
            }
        })

         */

        return c.json({status: "Success"},200);
    }
})