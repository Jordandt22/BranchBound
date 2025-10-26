"use client";

import React from "react";

// Contexts
import { AuthProvider } from "@/contexts/Auth.context";
import { SupabaseProvider } from "@/contexts/Supabase.context";

function ContextProvider({ children }) {
  return (
    <SupabaseProvider>
      <AuthProvider>{children}</AuthProvider>
    </SupabaseProvider>
  );
}

export default ContextProvider;
