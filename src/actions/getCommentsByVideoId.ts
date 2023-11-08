import prisma from "@/vendor/db";
import { Channel, Comment } from "@prisma/client";

interface GetCommentsByVideoIdParams {
  videoId?: string;
}

export default async function getCommentsByVideoId(
  params: GetCommentsByVideoIdParams
): Promise<(Comment & { channel: Channel })[] | null> {
  try {
    const { videoId } = params;

    const query: any = {};

    if (videoId) {
      query.videoId = videoId;
    }

    const comments = await prisma.comment.findMany({
      where: query,
      include: {
        channel: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return comments;
  } catch (error: any) {
    throw new Error(error);
  }
}
