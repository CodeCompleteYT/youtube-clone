"use client";

import { User } from "@prisma/client";
import { createContext } from "react";

export const CurrentUserContext = createContext<User | null>(null);

interface CurrentUserProviderProps {
  user: User | null;
}

const CurrentUserProvider: React.FC<
  React.PropsWithChildren<CurrentUserProviderProps>
> = ({ user, children }) => {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
