"use client";

import { Channel, Video } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import VideoCard from "@/components/shared/VideoCard";

export default function SearchPage() {
  const params = useSearchParams();
  const searchQuery = params.get("searchQuery");

  const [videos, setVideos] = useState<(Video & { channel: Channel })[]>([]);

  useEffect(() => {
    axios
      .get("/api/videos", { params: { searchQuery } })
      .then((data) => {
        setVideos(data.data as unknown as (Video & { channel: Channel })[]);
      })
      .catch(() => toast.error("Could not fetch videos"));
  }, [searchQuery]);

  return (
    <div className="w-4/5 mx-auto flex flex-col gap-4 items-center pb-4">
      {videos.length
        ? videos.map((video) => {
            return (
              <VideoCard
                key={video.id}
                isVertical={false}
                video={video}
                channel={video.channel}
                includeDescription
                channelAvatar
              />
            );
          })
        : "No videos found"}
    </div>
  );
}
