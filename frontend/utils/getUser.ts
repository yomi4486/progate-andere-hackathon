import {AppType} from '../../backend/src';
import { hc } from 'hono/client'
const base_url:string = `${process.env.BASE_URL}`;
const client = hc<AppType>(base_url)

client.user.$get({},{
    headers: {
        Authorization: 'Bearer TOKEN',
    },
}).then(async (result)=>{
    const json  = await result.json()
    console.log(json.status)
})

//　ここにユーザー取得の処理を書く