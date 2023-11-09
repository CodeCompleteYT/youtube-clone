import getCurrentChannel from "@/actions/getCurrentChannel";
import prisma from "@/vendor/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("searchQuery");

  if (!searchQuery) return NextResponse.error();

  const videos = await prisma.video.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "default",
          text: {
            query: searchQuery,
            path: {
              wildcard: "*",
            },
          },
        },
      },
      {
        $lookup: {
          from: "Channel",
          localField: "channelId",
          foreignField: "_id",
          as: "channel",
        },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          title: 1,
          description: 1,
          createdAt: { $dateToString: { date: "$createdAt" } },
          thumbnailSrc: 1,
          viewCount: 1,
          channel: { $arrayElemAt: ["$channel", 0] },
        },
      },
    ],
  });

  return NextResponse.json(videos);
}

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
