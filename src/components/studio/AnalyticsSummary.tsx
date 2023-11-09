"use client";

import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Video } from "@prisma/client";
import { useContext, useMemo } from "react";
import Avatar, { AvatarSize } from "../shared/Avatar";
import AnalyticsSummaryItem from "./AnalyticsSummaryItem";
import { compactNumberFormat } from "@/utils/numUtils";

interface AnalyticsSummaryProps {
  videos: Video[];
}

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({ videos }) => {
  useProtectedRoute();

  const currentChannel = useContext(CurrentChannelContext);

  const viewsCount = useMemo(
    () =>
      videos?.reduce((totalViews, video) => totalViews + video.viewCount, 0),
    [videos]
  );

  return (
    <div className="mx-auto flex items-center gap-4">
      <Avatar
        size={AvatarSize.large}
        imageSrc={currentChannel?.imageSrc}
        className="hidden md:inline"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnalyticsSummaryItem
          value={currentChannel?.name}
          subtitle={`@${currentChannel?.handle}`}
        />
        <AnalyticsSummaryItem
          value={compactNumberFormat(currentChannel?.subscriberCount)}
          subtitle="Subscribers"
        />
        <AnalyticsSummaryItem
          value={compactNumberFormat(viewsCount)}
          subtitle="Views"
        />
        <AnalyticsSummaryItem
          value={compactNumberFormat(videos.length)}
          subtitle="Videos"
        />
      </div>
    </div>
  );
};

export default AnalyticsSummary;
