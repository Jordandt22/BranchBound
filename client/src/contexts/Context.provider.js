"use client";

import React from "react";

// Contexts
import { AuthProvider } from "@/contexts/Auth.context";
import { SupabaseProvider } from "@/contexts/Supabase.context";
import { UsersAPIProvider } from "@/contexts/API/UsersAPI.context";
import { UserProvider } from "@/contexts/User.context";
import { GlobalProvider } from "@/contexts/Global.context";
import { ErrorProvider } from "@/contexts/Error.context";
import { ToastProvider } from "@/contexts/Toast.context";

function ContextProvider({ children }) {
  return (
    <ToastProvider>
      <GlobalProvider>
        <SupabaseProvider>
          <AuthProvider>
            <ErrorProvider>
              <UsersAPIProvider>
                <UserProvider>{children}</UserProvider>
              </UsersAPIProvider>
            </ErrorProvider>
          </AuthProvider>
        </SupabaseProvider>
      </GlobalProvider>
    </ToastProvider>
  );
}

export default ContextProvider;
