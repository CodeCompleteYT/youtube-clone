import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UseCommentProps {
  videoId?: string | null;
}

export const useComment = ({ videoId }: UseCommentProps) => {
  const currentChannel = useContext(CurrentChannelContext);
  const currentUser = useContext(CurrentUserContext);

  const createChannelModal = useContext(CreateChannelModalContext);

  const router = useRouter();

  const [text, setText] = useState("");

  const submitComment = useCallback(async () => {
    if (!currentUser) {
      alert("Please sign in to comment");
      return;
    }
    if (!currentChannel) {
      createChannelModal?.onOpen();
      return;
    }

    if (!videoId) return;

    const data = {
      videoId,
      text,
      channelId: currentChannel.id,
    };

    try {
      if (text.trim()) {
        await axios
          .post(`/api/comments/${videoId}`, data)
          .then(() => setText(""));
      }

      router.refresh();
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Could not comment");
    }
  }, [
    createChannelModal,
    currentUser,
    currentChannel,
    videoId,
    text,
    setText,
    router,
  ]);

  return {
    text,
    setText,
    submitComment,
  };
};
