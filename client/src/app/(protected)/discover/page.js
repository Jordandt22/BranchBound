"use client";

import React from "react";

// Components
import DiscoverHeader from "@/components/discover/DiscoverHeader";
import FeaturedWrapper from "@/components/discover/featured/FeaturedWrapper";
import StoryCarousel from "@/components/discover/StoryCarousel";

function DiscoverPage() {
  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="relative z-10">
        <DiscoverHeader />
      </div>

      {/* Main Content */}
      <div className="py-6 px-6 mt-4 md:mt-0">
        <FeaturedWrapper />

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
