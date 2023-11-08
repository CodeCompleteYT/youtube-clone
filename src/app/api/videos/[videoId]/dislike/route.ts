import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/vendor/db";
import { NextResponse } from "next/server";

interface IParams {
  videoId: string;
}

export async function POST(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  const { videoId } = params;

  if (!currentUser || !videoId) {
    return NextResponse.error();
  }

  let dislikedVideoIds = currentUser.dislikedVideoIds;

  dislikedVideoIds.push(videoId);

  const video = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      dislikeCount: {
        increment: 1,
      },
    },
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      dislikedVideoIds,
    },
  });

  return NextResponse.json({ user, video });
}

export async function DELETE(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  const { videoId } = params;

  if (!currentUser || !videoId) {
    return NextResponse.error();
  }

  let dislikedVideoIds = currentUser.dislikedVideoIds.filter(
    (dislikedVideoId) => dislikedVideoId !== videoId
  );

  const video = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      dislikeCount: {
        decrement: 1,
      },
    },
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      dislikedVideoIds,
    },
  });

  return NextResponse.json({ user, video });
}
