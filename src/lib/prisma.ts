import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // Use DIRECT_URL (session pooler, port 5432) for runtime queries.
  // DATABASE_URL (transaction pooler, port 6543) is for migrations only.
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("No DATABASE_URL or DIRECT_URL env variable set.");
  }

  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");

  const pool = new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 20000,
    allowExitOnIdle: true,
    // Supabase uses self-signed certificates behind Cloudflare.
    // rejectUnauthorized: false accepts the Supabase certificate chain.
    ssl: isLocal
      ? false
      : {
          rejectUnauthorized: false,
          // Force TLS — Supabase requires encrypted connections
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
