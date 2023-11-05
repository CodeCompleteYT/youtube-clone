import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

interface UseProtectedRouteProps {
  checkChannel?: boolean;
}

export const useProtectedRoute = ({
  checkChannel = true,
}: UseProtectedRouteProps = {}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentChannel = useContext(CurrentChannelContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser || (checkChannel && !currentChannel)) router.push("/");
  }, [checkChannel, currentChannel, currentUser, router]);
};
