"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

// Components
import PlayButton from "@/components/layout/buttons/PlayButton";
import FavoriteButton from "@/components/layout/buttons/FavoriteButton";
import ShareButton from "@/components/layout/buttons/ShareButton";

function StorySidebar({ story }) {
  const [isLongDescExpanded, setIsLongDescExpanded] = useState(false);
  const [isWorldDescExpanded, setIsWorldDescExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full md:w-2/5">
      {story.long_desc && (
        <div className="block md:hidden bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold">Description</h3>
            <button
              onClick={() => setIsLongDescExpanded(!isLongDescExpanded)}
              className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-hover/80 font-medium transition-colors text-sm shrink-0 cursor-pointer"
            >
              {isLongDescExpanded ? (
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
              !isLongDescExpanded ? "line-clamp-6" : ""
            }`}
          >
            {story.long_desc}
          </p>
        </div>
      )}
      {/* Tone and World Description */}
      {story.tone && (
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white font-semibold mb-2">Tone / Mood</h3>
          <p className="text-text-secondary text-sm leading-relaxed capitalize">
            {story.tone}
          </p>
        </div>
      )}
      {story.world_desc && (
        <div className="bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
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
        <PlayButton isLocked={story.is_locked} story={story} />
        <FavoriteButton isLocked={story.is_locked} />
        <ShareButton />
      </div>
    </div>
  );
}

export default StorySidebar;
