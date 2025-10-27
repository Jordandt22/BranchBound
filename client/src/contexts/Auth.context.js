"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Contexts
import { useSupabase } from "@/contexts/Supabase.context";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const { supabase } = useSupabase();

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

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, setSession, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
