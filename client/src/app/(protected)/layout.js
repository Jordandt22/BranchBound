"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

// Contexts
import { useGlobal } from "@/contexts/Global.context";

// Utils
import { setRedirectURL } from "@/lib/utils";

// Components
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function ProtectedLayout({ children }) {
  const pathname = usePathname();
  const {
    sidebarState: { isCollapsed },
  } = useGlobal();

  useEffect(() => {
    setRedirectURL(pathname);
  }, [pathname]);

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
