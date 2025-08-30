import { PrismaClient } from '../generated/prisma/edge.js';
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  var prisma: PrismaClient | undefined;
}

export function getPrisma() {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prisma.$extends(withAccelerate());
  }
  return global.prisma;
}
