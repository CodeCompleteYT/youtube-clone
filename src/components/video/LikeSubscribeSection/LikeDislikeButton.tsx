"use client";

import { LikeDislikeStatus, useLikeDislike } from "@/hooks/useLikeDislike";
import { compactNumberFormat } from "@/utils/numUtils";
import { Video } from "@prisma/client";
import {
  MdThumbUp,
  MdOutlineThumbUp,
  MdThumbDown,
  MdOutlineThumbDown,
} from "react-icons/md";

interface LikeDislikeButtonProps {
  video: Video;
}

const LikeDislikeButton: React.FC<LikeDislikeButtonProps> = ({ video }) => {
  const { likeDislikeStatus, toggleLikeDislike } = useLikeDislike({
    videoId: video.id,
  });

  return (
    <div className="flex items-center gap-1 bg-neutral-800 rounded-full px-3 py-2 text-white font-medium">
      <button
        className="pr-3 border-r-2 border-neutral-600 flex items-center gap-3"
        onClick={() => toggleLikeDislike("like")}
      >
        {likeDislikeStatus === LikeDislikeStatus.Liked ? (
          <MdThumbUp className="h-6 w-6" />
        ) : (
          <MdOutlineThumbUp className="h-6 w-6" />
        )}
        <p>{compactNumberFormat(video.likeCount)}</p>
      </button>
      <button className="pl-2" onClick={() => toggleLikeDislike("dislike")}>
        {likeDislikeStatus === LikeDislikeStatus.Disliked ? (
          <MdThumbDown className="h-6 w-6" />
        ) : (
          <MdOutlineThumbDown className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default LikeDislikeButton;
