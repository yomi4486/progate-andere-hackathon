import {Hono} from "hono";

type Bindings = {
    DATABASE_URL: string
}


export const UserRoute = new Hono<{ Variables: {"user_id":string},Bindings:Bindings}>()

.get("/",(c)=>{
    return c.json({status:"success"})
})

.get("/:id",(c)=>{
    return c.json({status:"success"})
})

.put("/",(c)=>{
    return c.json({status:"success"})
})

.delete("/",(c)=>{
    return c.json({status:"success"})
})