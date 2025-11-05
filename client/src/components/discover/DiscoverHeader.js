"use client";

import React, { useState } from "react";
import Link from "next/link";

// Contexts
import { useUser } from "@/contexts/User.context";

// Components
import SearchBar from "@/components/layout/SearchBar";

const DiscoverHeader = () => {
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");

  const getUserDisplayName = () => {
    return user?.username || "User";
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
        <div className="w-64">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Enter a story title..."
            inputClassName="bg-gray-800"
          />
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
