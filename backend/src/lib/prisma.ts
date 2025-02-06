import { PrismaClient } from "@prisma/client/edge"
export function getPrismaClient(url: string) {
    return new PrismaClient(
        {
            datasourceUrl: url
        }
    )
}