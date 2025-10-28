"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Menu,
  X,
  ChevronDown,
  Search,
  LayoutDashboard,
  FileText,
  ArrowRight,
} from "lucide-react";

// Contexts
import { useUser } from "@/contexts/User.context";

// Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ProfileMenuDropdown from "@/components/layout/ProfileMenuDropdown";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();
  const searchInputRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Focus search input when expanding
    if (isCollapsed && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300); // Wait for animation to complete
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    searchInputRef.current?.focus();
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const navigationItems = [
    {
      name: "Discover",
      href: "/discover",
      icon: Compass,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  const getUserInitials = () => {
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = () => {
    return user?.username || "User";
  };

  const sidebarContent = (
    <div className="flex flex-col items-center h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 w-full">
        {!isCollapsed && (
          <h2 className="text-white text-lg font-bold tracking-wide font-merriweather">
            BranchBound
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (isMobile) {
              setIsMobileOpen(false);
            } else {
              toggleCollapse();
            }
            clearSearch();
          }}
          className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full cursor-pointer duration-200"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Search Bar */}
      {isCollapsed ? (
        <div className="px-2 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="w-full h-10 bg-gray-700 hover:bg-accent-hover text-gray-400 hover:text-white cursor-pointer rounded-md"
          >
            <Search size={20} />
          </Button>
        </div>
      ) : (
        <div className="px-4 pb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-md px-10 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200"
            />
            {searchValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer"
              >
                <X size={14} />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={
          isCollapsed
            ? "flex-1 p-2 space-y-4 mt-2 w-full"
            : "flex-1 p-4 space-y-4 w-full"
        }
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 p-2 rounded-md duration-200
                ${
                  isActive
                    ? "bg-accent-hover text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* My Stories Section */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          {!isCollapsed && (
            <Link
              href="/dashboard"
              className="flex items-center justify-between w-full text-gray-400 bg-gray-800 md:bg-transparent hover:bg-gray-800 rounded-md p-2 duration-200"
            >
              <div className="flex items-center gap-2">
                <FileText className="text-gray-400" size={16} />
                <h3 className="text-sm font-medium text-gray-400">
                  My Stories
                </h3>
              </div>

              <ArrowRight size={14} />
            </Link>
          )}
        </div>
        {!isCollapsed && (
          <>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                No stories yet. Find a story and start your first adventure!
              </p>
            </div>
            <Link
              href="/discover"
              className="block w-full bg-accent-dark hover:scale-95 hover:bg-accent-hover text-white rounded-md p-2 text-sm font-medium text-center mt-4 duration-200"
            >
              Find a story
            </Link>
          </>
        )}
      </div>

      {/* User Profile */}
      <div className="p-4 w-full relative">
        <div
          className={`${
            isProfileMenuOpen && !isCollapsed
              ? "bg-gray-800 rounded-md p-2"
              : ""
          }`}
        >
          <div
            onClick={toggleProfileMenu}
            className={`
          flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 bg-gray-800 md:bg-transparent
          ${
            isCollapsed
              ? "justify-center hover:scale-90"
              : "bg-gray-800 hover:bg-gray-700 hover:scale-95"
          }
        `}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gray-600 text-white text-sm font-medium">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {getUserDisplayName()}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </div>
          {isProfileMenuOpen && (
            <ProfileMenuDropdown
              isCollapsed={isCollapsed}
              setIsProfileMenuOpen={setIsProfileMenuOpen}
              setIsMobileOpen={setIsMobileOpen}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsMobileOpen(true);
            setIsCollapsed(false);
          }}
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white hover:bg-gray-700 md:hidden"
        >
          <Menu size={20} />
        </Button>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`
          fixed top-0 left-0 h-full w-64 bg-surface border-r border-gray-800 z-50 transform transition-transform duration-300 md:hidden
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`
        hidden md:flex flex-col h-full bg-surface border-r border-gray-800 transition-all duration-300
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
