"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

// Contexts
import { useUser } from "@/contexts/User.context";

const DiscoverHeader = () => {
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");

  const getUserDisplayName = () => {
    return user?.username || "User";
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-4">
      {/* Left side - Welcome message */}
      <div className="hidden md:block">
        <p className="text-text-secondary text-md">Welcome back,</p>
        <p className="text-text-primary text-xl font-medium">
          {getUserDisplayName()}
        </p>
      </div>

      {/* Right side - Search bar */}
      <div className="flex items-center justify-end gap-4 absolute top-0 left-0 right-0 w-full py-4 px-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            size={16}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-64 bg-gray-800 text-text-primary placeholder-text-secondary rounded-lg px-10 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200"
          />
          {searchValue && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer hover:bg-gray-700 rounded-full p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Link
          href="/settings"
          className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors hidden md:flex"
        >
          <span className="text-text-primary text-sm">⚙</span>
        </Link>
      </div>
    </div>
  );
};

export default DiscoverHeader;
