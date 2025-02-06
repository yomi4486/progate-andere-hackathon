import { PrismaClient } from "@prisma/client"
export function getPrismaClient() {
    return new PrismaClient()
}