"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

export default function AuthLayout({ children }) {
  const { session } = useAuth();
  const router = useRouter();

  // Check for session
  useEffect(() => {
    if (session) {
      return router.push("/discover");
    }
  }, [session]);

  return <>{children}</>;
}
