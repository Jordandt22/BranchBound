"use client";

import React, { useState, useEffect } from "react";

// Components
import FeaturedBanner from "./FeaturedBanner";
import FeaturedSidebar from "./FeaturedSidebar";
import BackgroundImage from "./BackgroundImage";

const FeaturedSection = ({ stories }) => {
  const [activeStoryId, setActiveStoryId] = useState(
    stories.length > 0 ? stories[0]?.story_id : null
  );

  const activeStory =
    stories.length > 0
      ? stories.find((story) => story.story_id === activeStoryId) || stories[0]
      : null;

  const handleStorySelect = (storyId) => {
    setActiveStoryId(storyId);
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
    }, 1000 * 10);

    return () => clearInterval(interval);
  }, [activeStoryId, stories]);

  return (
    <>
      {stories.length > 0 ? (
        <>
          <BackgroundImage imageUrl={activeStory?.image_url} />

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
        </>
      ) : (
        <div className="flex flex-col items-center justify-start">
          <h1 className="text-2xl font-bold mb-2">No Featured Stories Found</h1>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      )}
    </>
  );
};

export default FeaturedSection;
