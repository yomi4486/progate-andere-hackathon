import { AppType } from "../../backend/src";
const { hc } = require("hono/dist/client") as typeof import("hono/client");
import type { InferRequestType, InferResponseType } from 'hono/client'
const base_url: string = `${process.env.EXPO_PUBLIC_BASE_URL}`;
const client = hc<AppType>(base_url);
const IdToGetRoom = client.rooms[":id"]

export async function deleteRoomById(idToken: string, id: string) {
  if (idToken) {
    try {
      const res = await client.rooms[":id"].$delete({
        param: {
          id: id,
        },
      });
    } catch (e) {
      throw Error("Fetch Error");
    }
  } else {
    throw Error("idToken is undefined");
  }
}

export async function get(idToken: string, id: string):Promise<InferResponseType<typeof IdToGetRoom.$get>> {
  if (idToken) {
    try {
      const res = await client.rooms[":id"].$get(
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

export async function postRoomById(idToken: string, room_name: string):Promise<InferResponseType<typeof client.rooms.$post>> {
  if (idToken) {
    try {
      const res = await client.rooms.$post(
        {
          json: { room_name: room_name },
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
