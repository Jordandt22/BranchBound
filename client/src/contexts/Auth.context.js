"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Contexts
import { useSupabase } from "@/contexts/Supabase.context";
import { useGlobal } from "@/contexts/Global.context";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const { supabase } = useSupabase();
  const { showLoading, hideLoading } = useGlobal();

  // Check for session
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
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
