import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // Use DATABASE_URL (transaction pooler, port 6543) for runtime — it handles
  // connection limits automatically. DIRECT_URL (session pooler) is for migrations only.
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("No DATABASE_URL env variable set.");
  }

  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");

  const pool = new Pool({
    connectionString,
    // Keep the pool very small — Supabase free tier limits concurrent connections.
    // In dev, HMR creates many short-lived processes so 1 is safest.
    max: process.env.NODE_ENV === "production" ? 5 : 1,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 30000,
    allowExitOnIdle: true,
    ssl: isLocal
      ? false
      : {
          rejectUnauthorized: false,
          checkServerIdentity: () => undefined,
        },
  });


  pool.on("error", (err) => {
    console.error("[Prisma PG Pool] Error:", err.message);
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
