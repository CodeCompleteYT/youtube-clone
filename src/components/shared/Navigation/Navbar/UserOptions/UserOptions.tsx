"use client";

import { useContext } from "react";
import SignInButton from "./SignInButton";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import IconButton from "@/components/shared/IconButton";
import { MdOutlineVideoCall } from "react-icons/md";
import Avatar, { AvatarSize } from "@/components/shared/Avatar";

const UserOptions = () => {
  const currentUser = useContext(CurrentUserContext);

  return currentUser ? (
    <>
      <div className="flex items-center gap-4 mr-4">
        <IconButton>
          <MdOutlineVideoCall className="h-7 w-7" />
        </IconButton>
        <Avatar
          size={AvatarSize.small}
          imageSrc={currentUser.image}
          onClick={() => {}}
        />
      </div>
    </>
  ) : (
    <SignInButton />
  );
};

export default UserOptions;
