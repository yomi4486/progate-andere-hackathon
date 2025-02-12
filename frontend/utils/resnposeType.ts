import { ClientResponse } from "hono/dist/types/client/types";
import { ContentfulStatusCode } from "hono/utils/http-status";

export type HonoResponseType<T extends (...args: any) => any> = ExtractClientResponseType<Awaited<ReturnType<T>>>;

type ExtractClientResponseType<T> = 
  T extends ClientResponse<infer U, infer S, any> 
    ? S extends 200 
      ? U 
      : never 
    : never;