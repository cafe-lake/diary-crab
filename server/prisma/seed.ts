import { PrismaClient } from "@prisma/client";
import { seedCrabs } from "./commands/local/crab";
import { seedCanvasItems } from "./commands/local/canvas-item";

const prisma = new PrismaClient();

async function seed() {
  seedCrabs();
  seedCanvasItems();
}

const handle = async () => {
  try {
    await seed();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

handle();
