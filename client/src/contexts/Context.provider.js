"use client";

import React from "react";

// Contexts
import { AuthProvider } from "@/contexts/Auth.context";
import { SupabaseProvider } from "@/contexts/Supabase.context";
import { UsersAPIProvider } from "@/contexts/API/UsersAPI.context";
import { UserProvider } from "@/contexts/User.context";
import { GlobalProvider } from "@/contexts/Global.context";

function ContextProvider({ children }) {
  return (
    <GlobalProvider>
      <SupabaseProvider>
        <AuthProvider>
          <UsersAPIProvider>
            <UserProvider>{children}</UserProvider>
          </UsersAPIProvider>
        </AuthProvider>
      </SupabaseProvider>
    </GlobalProvider>
  );
}

export default ContextProvider;
