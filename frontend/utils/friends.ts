import { AppType } from "../../backend/src";
import { HonoRequestType } from "./requestType";
const { hc } = require("hono/dist/client") as typeof import("hono/client");
import { HonoResponseType } from "./resnposeType";

const base_url: string = `${process.env.EXPO_PUBLIC_BASE_URL}`;
const client = hc<AppType>(base_url);
const idFriend =client.friends[":id"];
export async function post(idToken: string, id: string):Promise<HonoResponseType<typeof idFriend.$post> | null> {
  if (idToken) {
    try {
      const res = await client.friends[":id"].$post(
        {
          param: {
            id: id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const json = await res.json();
      return json;
    } catch (e) {
      throw Error("Fetch Error");
    }
  } else {
    throw Error("idToken is undefined");
  }
}

export async function put(idToken: string, id: string, status:HonoRequestType<typeof idFriend.$put>) {
  if (idToken) {
    try {
      const res = await client.friends[":id"].$put(
        {
          param: {
            id: id,
          },
          json: status,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const json = await res.json();
      return json;
    } catch (e) {
      throw Error("Fetch Error");
    }
  } else {
    throw Error("idToken is undefined");
  }
}
