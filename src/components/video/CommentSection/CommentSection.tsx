"use client";

import { Channel, Comment as CommentType } from "@prisma/client";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

interface CommentSectionProps {
  comments: (CommentType & { channel: Channel })[];
  videoId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  videoId,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full mb-4">
      <p>{comments.length} Comments</p>
      <CommentInput videoId={videoId} />
      <div className="flex flex-col gap-4 mt-4">
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default CommentSection;
