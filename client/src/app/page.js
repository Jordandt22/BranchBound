"use client";

import { useEffect } from "react";

// Contexts
import { useAuth } from "@/contexts/Auth.context";
import { useSupabase } from "@/contexts/Supabase.context";

export default function Home() {
  const { setSession } = useAuth();
  const { supabase } = useSupabase();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <a href="/auth/signup">Signup</a>
    </div>
  );
}
