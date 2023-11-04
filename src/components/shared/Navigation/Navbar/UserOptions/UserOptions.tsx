"use client";

import { useContext, useState } from "react";
import SignInButton from "./SignInButton";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import IconButton from "@/components/shared/IconButton";
import { MdOutlineVideoCall } from "react-icons/md";
import Avatar, { AvatarSize } from "@/components/shared/Avatar";
import UserMenu from "./UserMenu";

const UserOptions = () => {
  const currentUser = useContext(CurrentUserContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return currentUser ? (
    <>
      <div className="flex items-center gap-4 mr-4">
        <IconButton>
          <MdOutlineVideoCall className="h-7 w-7" />
        </IconButton>
        <Avatar
          size={AvatarSize.small}
          imageSrc={currentUser.image}
          onClick={() => setMenuOpen(true)}
        />
      </div>
      {menuOpen ? <UserMenu onClose={() => setMenuOpen(false)} /> : null}
    </>
  ) : (
    <SignInButton />
  );
};

export default UserOptions;
