"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useUsersAPI } from "@/contexts/API/UsersAPI.context";
import { useGlobal } from "@/contexts/Global.context";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const { session } = useAuth();
  const { getUser } = useUsersAPI();
  const { loadingState, showLoading, hideLoading } = useGlobal();

  useEffect(() => {
    showLoading("Loading your adventure...");
    // No User Session
    if (!session) {
      hideLoading();
      return router.push("/auth/login");
    }

    // Get user from DB
    const getUserWrapper = async () => {
      try {
        const res = await getUser(session.user.id);
        console.log("data", res);
        if (!res.data.user) {
          hideLoading();
          return router.push("/create-profile");
        }
      } catch (error) {
        hideLoading();
        console.error("Error getting user:", error);
        return router.push("/create-profile");
      }
    };
    getUserWrapper();
  }, []);

  return <>{children}</>;
}
