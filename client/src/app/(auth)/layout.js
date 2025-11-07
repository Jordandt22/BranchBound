"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

// Utils
import { getRedirectURL } from "@/lib/utils";

export default function AuthLayout({ children }) {
  const { session } = useAuth();
  const router = useRouter();

  // Check for session
  useEffect(() => {
    if (session) {
      return router.push(getRedirectURL());
    }
  }, [session]);

  return <>{children}</>;
}
