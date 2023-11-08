import getChannelById from "@/actions/getChannelById";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";
import Description from "@/components/video/Description";
import LikeSubscribeSection from "@/components/video/LikeSubscribeSection/LikeSubscribeSection";
import VideoPlayer from "@/components/video/VideoPlayer";

interface VideoPageParams {
  videoId?: string;
}

export default async function VideoPage({
  params,
}: {
  params: VideoPageParams;
}) {
  const { videoId } = params;

  const video = await increaseVideoViewCount({ videoId });
  const channel = await getChannelById({ channelId: video?.channelId });

  return video && channel ? (
    <div className="flex flex-col lg:flex-row mx-6 mt-2 gap-4">
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        <VideoPlayer videoSrc={video.videoSrc} />
        <h1 className="text-2xl font-medium break-all">{video.title}</h1>
        <LikeSubscribeSection video={video} channel={channel} />
        <Description video={video} />
      </div>
      <div className="w-full lg:w-1/4 flex flex-col gap-4 pb-4"></div>
    </div>
  ) : (
    <h1>Video not found</h1>
  );
}
