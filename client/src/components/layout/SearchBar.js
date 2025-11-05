"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  onClear,
}) => {
  const router = useRouter();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (trimmedValue) {
      if (onSubmit) {
        onSubmit(trimmedValue);
      } else {
        router.push(`/search?query=${encodeURIComponent(trimmedValue)}`);
      }
    }
  };

  const handleClear = () => {
    onChange("");
    if (onClear) {
      onClear();
    }
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          className={`w-full text-white placeholder-gray-400 rounded-md px-10 py-2 pr-10 md:pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 bg-gray-700 ${inputClassName}`}
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-600 cursor-pointer"
          >
            <X size={14} />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
