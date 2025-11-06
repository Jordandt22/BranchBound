"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Play,
  ChevronUp,
  ChevronDown,
  Heart,
  Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";

function StorySidebar({ story }) {
  const [isWorldDescExpanded, setIsWorldDescExpanded] = useState(false);
  const router = useRouter();
  const isLocked = story.is_locked;

  return (
    <div className="flex flex-col gap-6 w-2/5">
      {/* Tone and World Description */}
      {story.tone && (
        <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <h3 className="text-white font-semibold mb-2">Tone / Mood</h3>
          <p className="text-text-secondary text-sm leading-relaxed capitalize">
            {story.tone}
          </p>
        </div>
      )}
      {story.world_desc && (
        <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold">World Description</h3>
            <button
              onClick={() => setIsWorldDescExpanded(!isWorldDescExpanded)}
              className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-hover/80 font-medium transition-colors text-sm shrink-0 cursor-pointer"
            >
              {isWorldDescExpanded ? (
                <>
                  <span>Less</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>More</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
          <p
            className={`text-text-secondary text-sm leading-relaxed ${
              !isWorldDescExpanded ? "line-clamp-6" : ""
            }`}
          >
            {story.world_desc}
          </p>
        </div>
      )}

      {/* Start Story Button */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <Button
          size="lg"
          disabled={isLocked}
          className={`w-full md:w-1/2 z-10 ${
            isLocked
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-accent-primary hover:bg-accent-hover text-white cursor-pointer hover:scale-95 transition-all duration-300"
          }`}
          onClick={() => {
            if (isLocked) return;
            router.push(`/story/${story.slug}/play`);
          }}
        >
          {isLocked ? (
            <>
              <Lock size={20} />
              <span>Story Locked</span>
            </>
          ) : (
            <>
              <Play size={20} />
              <span>Start Story</span>
            </>
          )}
        </Button>
        <Button
          size="lg"
          disabled={isLocked}
          className={`w-full md:w-auto z-10 bg-red-400 hover:bg-red-500 hover:scale-95 transition-all duration-300 text-white cursor-pointer ${
            isLocked
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-red-400 hover:bg-red-500"
          }`}
        >
          <Heart size={20} />
        </Button>
        <Button
          size="lg"
          className="w-full md:w-auto z-10 bg-surface-hover hover:bg-surface/70 hover:scale-95 transition-all duration-300 text-white cursor-pointer"
        >
          <Share2 size={20} />
        </Button>
      </div>
    </div>
  );
}

export default StorySidebar;
