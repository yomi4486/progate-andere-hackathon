import { AppType } from "../../backend/src";
const { hc } = require("hono/dist/client") as typeof import("hono/client");
import { HonoResponseType } from "./resnposeType";
import { HonoRequestType } from "./requestType";
import { useAuth } from "./authContext";

const base_url: string = `${process.env.EXPO_PUBLIC_BASE_URL}`;
const client = hc<AppType>(base_url);

// 自分のユーザーを取得
export async function get(
  idToken?: string | undefined
): Promise<HonoResponseType<typeof client.users.$get>> {
  if (idToken) {
    const result = await client.users.$get(
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    console.log(result);
    if (result.ok) {
      console.log(result);
      const json = await result.json();
      return json;
    } else {
      throw Error("Fetch to Server");
    }
  } else {
    throw Error("idToken is undefind");
  }
}
export async function post(
  data: HonoRequestType<typeof client.users.$post>,
  idToken?: string | undefined
): Promise<HonoResponseType<typeof client.users.$post> | null> {
  if(!idToken){
    const { user } = useAuth();
    if(user?.data.idToken){
      idToken = user?.data.idToken;
    }else{
      throw Error("idToken is undefined")
    }
  }
  if (idToken) {
    try {
      const res = await client.users.$post(
        {
          json: data,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      console.log(res)
      console.log(res.status)
      if(!res.ok)throw Error("request failed")
      const json = await res.json();
      return json;
    } catch (e) {
      console.log(e)
      return null;
    }
  } else {
    throw Error("idToken is undefined");
  }
}
