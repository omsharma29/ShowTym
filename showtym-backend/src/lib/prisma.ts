
import { PrismaClient } from '../generated/prisma/edge.js';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

// Type definitions
// declare global {
//   var prisma: PrismaClient | undefined
// }

const connectionString = process.env.DATABASE_URL as string;

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });



export default prisma;