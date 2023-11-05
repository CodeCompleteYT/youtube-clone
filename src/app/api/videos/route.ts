import getCurrentChannel from "@/actions/getCurrentChannel";
import prisma from "@/vendor/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentChannel = await getCurrentChannel();

  if (!currentChannel) {
    return NextResponse.error();
  }

  const { id, title, description, videoSrc, thumbnailSrc } =
    await request.json();

  const video = await prisma.video.create({
    data: {
      title,
      description,
      videoSrc,
      thumbnailSrc,
      id,
      channelId: currentChannel?.id,
    },
  });

  return NextResponse.json(video);
}
