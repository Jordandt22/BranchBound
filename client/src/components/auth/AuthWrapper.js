"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useUsersAPI } from "@/contexts/API/UsersAPI.context";
import { useGlobal } from "@/contexts/Global.context";
import { useUser } from "@/contexts/User.context";
import { useError } from "@/contexts/Error.context";

// Handlers
import { DEFAULT_ERROR_MESSAGE } from "@/lib/handlers/errorHandlers";
import { errorCodes } from "@/lib/handlers/errorHandlers";
import { getRedirectURL } from "@/lib/utils";

function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, authIsLoading } = useAuth();
  const { getUser } = useUsersAPI();
  const { hideLoading, showError } = useGlobal();
  const { user, updateUser } = useUser();
  const { getUserErrorHandler } = useError();

  useEffect(() => {
    if (authIsLoading || (pathname === "/" && !session)) return;

    // No User Session
    if (!session) {
      hideLoading();
      return router.push("/login");
    }

    // User already has a profile
    if (user) {
      hideLoading();
      console.log("AuthWrapper 1");
      return router.push(getRedirectURL());
    }

    // Get user from DB
    const getUserWrapper = async () => {
      try {
        const res = await getUser(session.user.id);
        const { data, error: APIError } = res.data.data;

        // Check for API Error
        if (APIError) {
          if (APIError.code === errorCodes.USER_NOT_FOUND) {
            return router.push("/create-profile");
          }

          getUserErrorHandler(APIError, showError);
          return router.push("/");
        }

        // Check if profile was created
        if (!data.user) {
          return router.push("/create-profile");
        }

        updateUser(data.user);
        return router.push(getRedirectURL());
      } catch (error) {
        if (error?.response?.data) {
          const { error: APIError } = error.response.data;
          if (APIError.code === errorCodes.USER_NOT_FOUND) {
            return router.push("/create-profile");
          }

          getUserErrorHandler(APIError, showError);
        } else {
          showError(DEFAULT_ERROR_MESSAGE);
        }

        return router.push("/");
      } finally {
        hideLoading();
      }
    };
    getUserWrapper();
  }, [authIsLoading, pathname, session, user]);

  if (authIsLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
        <p className="text-2xl font-bold text-white">
          Loading your adventure...
        </p>
      </div>
    );

  return <>{children}</>;
}

export default AuthWrapper;
