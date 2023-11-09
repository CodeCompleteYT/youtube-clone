import prisma from "@/vendor/db";
import { Channel, Video } from "@prisma/client";

export default async function getTrendingVideos(): Promise<
  (Video & { channel: Channel })[]
> {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    const videos = await prisma.video.findMany({
      include: {
        channel: true,
      },
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: [
        {
          viewCount: "desc",
        },
      ],
      take: 50,
    });

    return videos;
  } catch (error: any) {
    throw new Error(error);
  }
}
