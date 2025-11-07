"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Contexts
import { useSupabase } from "@/contexts/Supabase.context";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const { supabase } = useSupabase();
  const [session, setSession] = useState(null);
  const [authIsLoading, setAuthIsLoading] = useState(true);
  const pathname = usePathname();

  const clearSession = () => {
    setSession(null);
    setAuthIsLoading(false);
  };

  // Check for session
  useEffect(() => {
    localStorage.setItem("redirect", pathname);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [pathname]);

  const logout = async () => {
    await supabase.auth.signOut();
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{ session, setSession, logout, authIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
