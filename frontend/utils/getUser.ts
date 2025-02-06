import {AppType} from '../../backend/src/index';
import { hc } from 'hono/client'
const base_url:string = `${process.env.BASE_URL}`;
const client = hc<AppType>(base_url)
//　ここにユーザー取得の処理を書く