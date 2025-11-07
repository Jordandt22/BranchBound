"use client";

import React from "react";

// Contexts
import { useGlobal } from "@/contexts/Global.context";

// Components
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function ProtectedLayout({ children }) {
  const {
    sidebarState: { isCollapsed },
  } = useGlobal();

  return (
    <AuthWrapper>
      <div className="flex h-screen bg-[#0E1114]">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          className={`flex-1 overflow-auto md:py-4 ${
            isCollapsed ? "md:px-36" : "px-0 md:px-12"
          }`}
        >
          {children}

          <Footer />
        </div>
      </div>
    </AuthWrapper>
  );
}
