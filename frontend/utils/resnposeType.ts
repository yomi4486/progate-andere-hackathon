import { ClientResponse } from "hono/dist/types/client/types";
export type HonoResponseType<T extends (...args: any) => any> = ExtractClientResponseType<Awaited<ReturnType<T>>>;

type ExtractClientResponseType<T> = T extends ClientResponse<infer U, any, any> ? U : never;