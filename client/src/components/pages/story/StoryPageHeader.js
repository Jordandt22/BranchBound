"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/layout/SearchBar";

function StoryPageHeader({ story }) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between px-6 py-4">
      {/* Left side - Back Button and Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-gray-400 bg-surface hover:text-white hover:bg-surface-hover cursor-pointer"
        >
          <ArrowLeft size={20} />
        </Button>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <Link
            href="/discover"
            className="text-text-secondary hover:text-white transition-colors"
          >
            Discover
          </Link>
          <span className="text-text-secondary">/</span>
          <span className="text-text-primary">{story.title}</span>
        </nav>
      </div>

      {/* Right side - Share Button */}
      <div className="flex items-center justify-end gap-4">
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
}

export default StoryPageHeader;
