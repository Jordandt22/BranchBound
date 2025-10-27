"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useUsersAPI } from "@/contexts/API/UsersAPI.context";
import { useGlobal } from "@/contexts/Global.context";
import { useUser } from "@/contexts/User.context";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const { session } = useAuth();
  const { getUser } = useUsersAPI();
  const { showLoading, hideLoading } = useGlobal();
  const { user, updateUser } = useUser();

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
      return router.push("/dashboard");
    }

    // Get user from DB
    const getUserWrapper = async () => {
      try {
        const res = await getUser(session.user.id);
        const data = res.data.data;
        if (!data.user) {
          hideLoading();
          return router.push("/create-profile");
        }

        hideLoading();
        updateUser(data.user);
        router.push("/dashboard");
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
