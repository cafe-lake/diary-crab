import { PrismaClient } from "@prisma/client";

export const seedCanvasItems = async () => {
  const prisma = new PrismaClient();
  try {
    const item1 = await prisma.canvasItem.findUnique({
      where: {
        id: 1,
      },
    });
    if (!item1) {
      await prisma.canvasItem.create({
        data: {
          label: "やおやさん",
          url: "https://3.bp.blogspot.com/-6T6YOr6aUck/UdEenstrOOI/AAAAAAAAVzw/GCMNx0MKMGI/s718/yaoya.png",
          display_order: 2,
        },
      });
    }

    const item2 = await prisma.canvasItem.findUnique({
      where: {
        id: 2,
      },
    });
    if (!item2) {
      await prisma.canvasItem.create({
        data: {
          label: "もぶかに",
          url: "https://2.bp.blogspot.com/-R1xfN9n-n5I/VCOJqeGIJqI/AAAAAAAAm0k/6zzMpbfGWKU/s800/fish_kani_shiomaneki.png",
          display_order: 1,
        },
      });
    }
  } catch (e) {
    throw e;
  }
};
