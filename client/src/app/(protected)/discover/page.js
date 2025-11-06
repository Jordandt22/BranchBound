"use client";

import React from "react";

// Components
import DiscoverHeader from "@/components/pages/discover/DiscoverHeader";
import FeaturedWrapper from "@/components/pages/discover/featured/FeaturedWrapper";
import StoryCarousel from "@/components/pages/discover/StoryCarousel";
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";

function DiscoverPage() {
  return (
    <MainPageWrapper
      Header={<MainHeader breadcrumbItems={[{ label: "Discover" }]} />}
    >
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
    </MainPageWrapper>
  );
}

export default DiscoverPage;
