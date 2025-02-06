import jwt from "jsonwebtoken";
import {HTTPException} from "hono/http-exception";
import { validateToken, type jwtValidationResponse } from "@kinde/jwt-validator";


export async function jwtAuth(token:string){
    try {
        const validationResult: jwtValidationResponse = await validateToken({
            token: token,
            domain: "https://monodevcloud-development.us.kinde.com"
        });

        if (!validationResult.valid) throw new HTTPException(401, {message: "Unauthorized"});
        const result_jwt = jwt.decode(token);
        if (!result_jwt || !result_jwt.sub) throw new HTTPException(401, {message: "Unauthorized"});

        return result_jwt.sub.toString();
    }catch (e) {
        if (e instanceof HTTPException) throw e;
        throw new HTTPException(500, {message: "Internal Server Error"});
    }
}