import {Hono} from "hono";
import { upgradeWebSocket } from 'hono/cloudflare-workers'
import { Redis } from "@upstash/redis";

type Bindings = {
    DATABASE_URL: string
}

export const WsRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()
    .get(
        '/v1',
        upgradeWebSocket((c) => {
            return {
                onMessage(event, ws) {
                    console.log(`Message from client: ${event.data}`)
                    ws.send('Hello from server!')
                },
                onClose: () => {
                    console.log('Connection closed')
                },
            }
        })
    )