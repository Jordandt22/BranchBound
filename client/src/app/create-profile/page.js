"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useUser } from "@/contexts/User.context";
import { useAuth } from "@/contexts/Auth.context";

// Components
import CreateProfileForm from "@/components/auth/CreateProfileForm";

// Utils
import { getRedirectURL } from "@/lib/utils";

export default function CreateProfilePage() {
  const { session } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      return router.push("/login");
    }

    if (user) {
      return router.push(getRedirectURL());
    }
  }, [user, session]);

  return <CreateProfileForm />;
}
