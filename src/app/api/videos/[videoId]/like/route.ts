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

  let likedVideoIds = currentUser.likedVideoIds;

  likedVideoIds.push(videoId);

  const video = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      likeCount: {
        increment: 1,
      },
    },
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      likedVideoIds,
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

  let likedVideoIds = currentUser.likedVideoIds.filter(
    (likedVideoId) => likedVideoId !== videoId
  );

  const video = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      likeCount: {
        decrement: 1,
      },
    },
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      likedVideoIds,
    },
  });

  return NextResponse.json({ user, video });
}
