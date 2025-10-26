"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    console.log("session", session);
    if (!session) {
      router.push("/auth/signup");
    }
  }, [session, router]);

  return <>{children}</>;
}
