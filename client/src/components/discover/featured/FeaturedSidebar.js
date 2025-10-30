"use client";

import React from "react";
import Image from "next/image";

// Utils
import { getStoryImageURL } from "@/lib/utils";

const FeaturedSidebar = ({ stories, activeStoryId, onStorySelect }) => {
  // Filter out the active story to show only non-active ones
  const nonActiveStories = stories.filter(
    (story) => story.story_id !== activeStoryId
  );

  return (
    <div className="space-y-4 transition-all duration-300">
      {nonActiveStories.map((story, index) => (
        <div
          key={story.story_id}
          onClick={() => onStorySelect(story.story_id)}
          className="bg-surface/40 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-surface-hover transition-all duration-300 hover:scale-105 group"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="flex items-center gap-4">
            {/* Story Image */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <Image
                src={getStoryImageURL(story.slug)}
                alt={story.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-200"
                sizes="64px"
              />
            </div>

            {/* Story Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-text-primary font-semibold text-sm mb-1 line-clamp-1 group-hover:text-accent-primary transition-colors">
                {story.title}
              </h3>
              <p className="text-text-secondary text-xs line-clamp-1 leading-relaxed">
                {story.short_desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSidebar;
