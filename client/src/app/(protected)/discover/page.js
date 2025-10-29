"use client";

import React, { useState } from "react";
import DiscoverHeader from "@/components/discover/DiscoverHeader";
import FeaturedSection from "@/components/discover/FeaturedSection";
import StoryCarousel from "@/components/discover/StoryCarousel";
import BackgroundImage from "@/components/discover/BackgroundImage";
import { mockStories } from "@/data/mockStories";

function DiscoverPage() {
  const [activeStoryId, setActiveStoryId] = useState(
    mockStories.featured[0]?.story_id || null
  );

  const activeStory =
    mockStories.featured.find((story) => story.story_id === activeStoryId) ||
    mockStories.featured[0];

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="relative z-10">
        <DiscoverHeader />
      </div>

      <BackgroundImage imageUrl={activeStory?.image_url} />

      {/* Main Content */}
      <div className="relative py-6 px-6 mt-4 md:mt-0">
        {/* Featured Section */}
        <FeaturedSection
          stories={mockStories.featured}
          onActiveStoryChange={setActiveStoryId}
        />

        {/* Other Sections */}
        <div className="space-y-8">
          {/* Trending Section */}
          {/* <StoryCarousel title="Trending" stories={mockStories.trending} /> */}

          {/* Newly Added Section */}
          {/* <StoryCarousel
            title="Recently Added"
            stories={mockStories.newlyAdded}
          /> */}

          {/* Action Section */}
          {/* <StoryCarousel title="Action" stories={mockStories.action} /> */}

          {/* Romance Section */}
          {/* <StoryCarousel title="Romance" stories={mockStories.romance} /> */}

          {/* Mystery Section */}
          {/* <StoryCarousel title="Mystery" stories={mockStories.mystery} /> */}
        </div>
      </div>
    </div>
  );
}

export default DiscoverPage;
