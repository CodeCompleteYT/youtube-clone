"use client";

import { createContext, useState } from "react";

type ModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const CreateChannelModalContext = createContext<ModalState | null>(null);

const CreateChannelModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CreateChannelModalContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </CreateChannelModalContext.Provider>
  );
};

export default CreateChannelModalProvider;
