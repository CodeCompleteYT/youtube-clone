import { Channel, Video } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Avatar, { AvatarSize } from "./Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import dayjs from "@/vendor/dayjs";

interface VideoCardProps {
  channel?: Channel;
  channelAvatar?: boolean;
  video: Video;
  includeDescription?: boolean;
  isVertical?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  channel,
  channelAvatar = false,
  video,
  includeDescription = false,
  isVertical = true,
}) => {
  return (
    <Link className="w-full" href={`/video/${video.id}`}>
      <div
        className={`flex items-start ${
          isVertical ? "flex-col" : "flex-row"
        } gap-2 cursor-pointer overflow-hidden`}
      >
        <div
          className={`relative aspect-video ${isVertical ? "w-full" : "w-2/5"}`}
        >
          <Image
            className="object-cover rounded-lg"
            src={video.thumbnailSrc}
            alt={`Thumbnail for ${video.title}`}
            layout="fill"
          />
        </div>
        <div
          className={`flex gap-2 items-start ${
            isVertical ? "w-full" : "w-3/5"
          }`}
        >
          {channel && channelAvatar && isVertical ? (
            <Avatar className="mt-1" imageSrc={channel.imageSrc} />
          ) : null}
          <div className="flex flex-col">
            <h3
              className={`line-clamp-2 ${
                isVertical ? "text-lg" : "text-md leading-5"
              }`}
            >
              {video.title}
            </h3>
            {channel ? (
              <div className="flex gap-2 items-center">
                {!isVertical && channelAvatar ? (
                  <Avatar
                    size={AvatarSize.extraSmall}
                    className="my-1"
                    imageSrc={channel.imageSrc}
                  />
                ) : null}
                <p className="text-neutral-400 text-sm whitespace-nowrap">
                  {channel.name}
                </p>
              </div>
            ) : null}
            <p className="text-neutral-400 text-sm">
              {compactNumberFormat(video.viewCount)} views •{" "}
              {dayjs(video.createdAt).fromNow()}
            </p>
            {includeDescription ? (
              <div className="whitespace-pre-line text-sm text-neutral-400">
                {video.description.split("\n").map((line, index) => {
                  return line === "" ? (
                    <br key={index} />
                  ) : (
                    <p key={index}>{line}</p>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
