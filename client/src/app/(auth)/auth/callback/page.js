// app/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useSupabase } from "@/contexts/Supabase.context";

export default function AuthCallback() {
  const router = useRouter();
  const { setSession } = useAuth();
  const { supabase } = useSupabase();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth error:", error);
        router.push("/login");
      }

      if (session) {
        setSession(session);
        router.push("/create-profile");
      }
    };

    handleAuth();
  }, [router, setSession]);

  return <p>Completing sign-in...</p>;
}
