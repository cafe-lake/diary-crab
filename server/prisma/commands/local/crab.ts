import { PrismaClient } from "@prisma/client";

export const seedCrabs = async () => {
  const prisma = new PrismaClient();
  try {
    const crab1 = await prisma.crab.findUnique({
      where: {
        id: 1,
      },
    });
    if (!crab1) {
      await prisma.crab.create({
        data: {
          species: "ふつうのカニ",
          image_url:
            "https://4.bp.blogspot.com/-sdhuHWjgfCo/UYOsrFBf5RI/AAAAAAAARKs/THaabR1hDq4/s600/umi_kani.png",
        },
      });
    }

    const crab2 = await prisma.crab.findUnique({
      where: {
        id: 2,
      },
    });
    if (!crab2) {
      await prisma.crab.create({
        data: {
          species: "毛ガニ",
          image_url:
            "https://2.bp.blogspot.com/-UWogktrnHxM/VRE4w8qq6WI/AAAAAAAAsXs/em-ppuMEGW0/s800/kani_kegani.png",
        },
      });
    }
  } catch (e) {
    throw e;
  }
};
