"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

// Contexts
import { useGlobal } from "@/contexts/Global.context";

// Utils
import { setRedirectURL } from "@/lib/utils";

// Components
import Sidebar from "@/components/layout/Sidebar";
import AuthWrapper from "@/components/auth/AuthWrapper";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function ProtectedLayout({ children }) {
  const pathname = usePathname();
  const {
    sidebarState: { isCollapsed },
  } = useGlobal();

  useEffect(() => {
    setRedirectURL(pathname);
  }, [pathname]);

  // Scroll to top on route change with custom slow animation
  useEffect(() => {
    // Custom smooth scroll function with configurable duration
    const smoothScrollToTop = (element) => {
      const start = element.scrollTop;
      const startTime = performance.now();
      const duration = 500;

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-in-out)
        const easeInOut =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        element.scrollTop = start * (1 - easeInOut);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    // Find the scrollable container (the one with overflow-auto)
    const scrollContainer = document.querySelector('[class*="overflow-auto"]');

    if (scrollContainer) {
      smoothScrollToTop(scrollContainer);
    } else {
      // Fallback to window if no container found
      smoothScrollToTop(document.documentElement);
    }
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
        </div>

        <ScrollToTopButton />
      </div>
    </AuthWrapper>
  );
}
