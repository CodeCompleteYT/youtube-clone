"use client";

import { createContext, useState } from "react";

type ModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const UploadVideoModalContext = createContext<ModalState | null>(null);

const UploadVideoModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UploadVideoModalContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </UploadVideoModalContext.Provider>
  );
};

export default UploadVideoModalProvider;
