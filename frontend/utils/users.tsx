import {AppType} from '../../backend/src';
const { hc } = require("hono/dist/client") as typeof import("hono/client");
import { useAuthContext } from './authContext';
import { HonoResponseType } from './resnposeType';

const base_url:string = `${process.env.EXPO_PUBLIC_BASE_URL}`; 
const client = hc<AppType>(base_url);


// 自分のユーザーを取得
export async function get(idToken:string|undefined):Promise<HonoResponseType<typeof client.users.$get>>{

    if (!idToken){
        const result = await client.users.$get({},{
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        })

        if(result.ok){
            const json = await result.json()
            return json;
        }else{
            throw Error("Fetch to Server")
        }
    }else{
        throw Error("idToken is undefind")
    }
}

// 自分のプロフィールを変更
export async function post():Promise<HonoResponseType<typeof client.users.$post> | null>{
    const {idToken} = useAuthContext();
    if (idToken != null){
        try{
            const res = await client.users.$post({
                json:{
                    status:"",
                    username:"",
                    icon_url:"",
                    status_message:"",
                    introduction:""
                }
            },{
                headers: { 
                    Authorization: `Bearer ${idToken}`, 
                }, 
            })
            
            const json = await res.json();
            return json;
        }catch(e){
            return null;
        }
    }else{ 
        return null; 
    }
}