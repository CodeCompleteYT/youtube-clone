"use client";

import { createContext, useState } from "react";

type SidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const SidebarContext = createContext<SidebarState | null>(null);

const SidebarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
