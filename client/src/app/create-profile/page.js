"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useUser } from "@/contexts/User.context";
import { useAuth } from "@/contexts/Auth.context";

// Components
import CreateProfileForm from "@/components/auth/CreateProfileForm";

export default function CreateProfilePage() {
  const { session } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      return router.push("/login");
    }

    if (user) {
      return router.push("/dashboard");
    }
  }, [user, session, router]);

  return <CreateProfileForm />;
}
