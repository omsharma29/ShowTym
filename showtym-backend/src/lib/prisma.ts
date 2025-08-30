// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client/edge';
import { neonConfig } from '@neondatabase/serverless';

// Enable fetch-based queries for Cloudflare Workers
neonConfig.poolQueryViaFetch = true;

// Singleton Prisma instance
let prisma: PrismaClient;

// Default export Prisma
export default (env: any) => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: { url: env.DATABASE_URL as string },
      },
    });
  }
  return prisma;
};
