"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Handlers
import {
  errorCodes,
  DEFAULT_ERROR_MESSAGE,
} from "@/lib/handlers/errorHandlers";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useUsersAPI } from "@/contexts/API/UsersAPI.context";
import { useGlobal } from "@/contexts/Global.context";
import { useUser } from "@/contexts/User.context";
import { useError } from "@/contexts/Error.context";

// Components
import Sidebar from "@/components/layout/Sidebar";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const { session } = useAuth();
  const { getUser } = useUsersAPI();
  const { showLoading, hideLoading, showError } = useGlobal();
  const { user, updateUser } = useUser();
  const { getUserErrorHandler } = useError();
  const {
    sidebarState: { isCollapsed },
  } = useGlobal();

  useEffect(() => {
    showLoading("Loading your adventure...");

    // No User Session
    if (!session) {
      hideLoading();
      return router.push("/login");
    }

    // User already has a profile
    if (user) {
      hideLoading();
      return router.push("/discover");
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
        router.push("/discover");
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
  }, []);

  return (
    <div className="flex h-screen bg-[#0E1114]">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={`flex-1 overflow-auto md:py-4 px-4 ${
          isCollapsed ? "md:px-36" : "px-12"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
