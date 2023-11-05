import prisma from "@/vendor/db";
import { Channel } from "@prisma/client";

interface GetChannelByIdParams {
  channelId?: string;
}

export default async function getChannelById(
  params: GetChannelByIdParams
): Promise<Channel | null> {
  try {
    const { channelId } = params;

    const query: any = {};

    if (channelId) {
      query.id = channelId;
    }

    const channel = await prisma.channel.findFirst({
      where: query,
    });

    return channel;
  } catch (error: any) {
    throw new Error(error);
  }
}
