import { PrismaClient } from "@prisma/client";

import "../config/env.js";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__prismaClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prismaClient = prisma;
}
