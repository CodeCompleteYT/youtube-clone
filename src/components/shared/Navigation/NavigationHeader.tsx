"use client";

import { MdMenu } from "react-icons/md";
import IconButton from "../IconButton";
import Logo from "../Logo";

const NavigationHeader = () => {
  return (
    <div className="flex flex-row items-center">
      <IconButton>
        <MdMenu className="h-6 w-6" />
      </IconButton>
      <Logo />
    </div>
  );
};

export default NavigationHeader;
