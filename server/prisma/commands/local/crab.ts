import { PrismaClient } from "@prisma/client";

export const seedCrabs = async () => {
  const prisma = new PrismaClient();
  try {
    await prisma.crab.deleteMany();

    await prisma.crab.create({
      data: {
        species: "ふつうのカニ",
        image_url:
          "https://4.bp.blogspot.com/-sdhuHWjgfCo/UYOsrFBf5RI/AAAAAAAARKs/THaabR1hDq4/s600/umi_kani.png",
      },
    });

    await prisma.crab.create({
      data: {
        species: "毛ガニ",
        image_url:
          "https://2.bp.blogspot.com/-UWogktrnHxM/VRE4w8qq6WI/AAAAAAAAsXs/em-ppuMEGW0/s800/kani_kegani.png",
      },
    });
  } catch (e) {
    throw e;
  }
};
