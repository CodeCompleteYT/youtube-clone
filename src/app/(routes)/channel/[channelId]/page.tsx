import getChannelById from "@/actions/getChannelById";
import getVideosByChannelId from "@/actions/getVideosByChannelId";
import ChannelHeader from "@/components/channel/ChannelHeader";
import VideoCard from "@/components/shared/VideoCard";

interface ChannelPageParams {
  channelId?: string;
}

export default async function ChannelPage({
  params,
}: {
  params: ChannelPageParams;
}) {
  const { channelId } = params;

  const channel = await getChannelById({ channelId });
  const videos = await getVideosByChannelId({ channelId });

  return channel ? (
    <div className="flex flex-col">
      <ChannelHeader channel={channel} videoCount={videos.length} />
      <div className="border-b-2 border-b-neutral-800 capitalize">
        <div className="text-center px-6 py-2 border-b-2 border-b-neutral-400 w-24 mx-auto md:mx-32">
          Videos
        </div>
      </div>
      <div className="mx-12 sm:mx-24 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  ) : (
    <h1>Channel not found</h1>
  );
}
