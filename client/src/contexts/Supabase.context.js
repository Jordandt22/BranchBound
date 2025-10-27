"use client";

import React, { createContext, useContext } from "react";
import { supabase } from "@/lib/supabase/supabase";

const SupabaseContext = createContext();
export const useSupabase = () => useContext(SupabaseContext);
export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};
