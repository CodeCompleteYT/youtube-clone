"use client";

import { useSubscribe } from "@/hooks/useSubscribe";
import Button from "./Button";

interface SubscribeButtonProps {
  channelId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ channelId }) => {
  const { hasSubscribed, toggleSubscribed } = useSubscribe({ channelId });

  return (
    <Button
      type={hasSubscribed ? "rounded-dark" : "rounded"}
      onClick={toggleSubscribed}
    >
      {hasSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
