// app/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useSupabase } from "@/contexts/Supabase.context";

// Components
import LoadingSpinner from "@/components/state/LoadingSpinner";

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

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
      <p className="text-2xl font-bold text-white">Completing Sign-In...</p>
    </div>
  );
}
