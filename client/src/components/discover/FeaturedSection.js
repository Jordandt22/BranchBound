"use client";

import React, { useState, useEffect } from "react";
import FeaturedBanner from "./FeaturedBanner";
import FeaturedSidebar from "./FeaturedSidebar";

const FeaturedSection = ({ stories, onActiveStoryChange }) => {
  const [activeStoryId, setActiveStoryId] = useState(
    stories[0]?.story_id || null
  );

  const activeStory =
    stories.find((story) => story.story_id === activeStoryId) || stories[0];

  const handleStorySelect = (storyId) => {
    setActiveStoryId(storyId);
    onActiveStoryChange(storyId);
  };

  // Auto-rotation every 3 seconds
  useEffect(() => {
    if (stories.length <= 1) return;

    const interval = setInterval(() => {
      const currentIndex = stories.findIndex(
        (story) => story.story_id === activeStoryId
      );
      const nextIndex = (currentIndex + 1) % stories.length;
      const nextStoryId = stories[nextIndex].story_id;

      setActiveStoryId(nextStoryId);
      onActiveStoryChange(nextStoryId);
    }, 1000 * 10);

    return () => clearInterval(interval);
  }, [activeStoryId, stories, onActiveStoryChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Main Banner - Takes up 2/3 of the width */}
      <div className="lg:col-span-2">
        <FeaturedBanner story={activeStory} />
      </div>

      {/* Sidebar - Takes up 1/3 of the width */}
      <div className="lg:col-span-1">
        <FeaturedSidebar
          stories={stories}
          activeStoryId={activeStoryId}
          onStorySelect={handleStorySelect}
        />
      </div>
    </div>
  );
};

export default FeaturedSection;
