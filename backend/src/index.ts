import {Hono} from "hono";

const app = new Hono()
.get((c)=>{
    return c.json({status:"success"})
})


export type IndexAppRoute = typeof app