"use client";

import React, { useState, useEffect } from "react";
import { getStoryImageURL } from "@/lib/utils";
import { THREE_TO_TWO } from "@/lib/constants/aspectRatios";

// Components
import BackgroundImage from "@/components/pages/discover/featured/BackgroundImage";
import StoryInfo from "./StoryInfo";
import StorySidebar from "./StorySidebar";
import StoryCharacters from "./StoryCharacters";

const StoryPageContent = ({ story }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const toggleExpand = (character) => {
    setSelectedCharacter(character);
  };

  const closeExpand = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="w-full relative">
      {/* Background Image */}
      <BackgroundImage imageUrl={getStoryImageURL(story.slug, THREE_TO_TWO)} />

      <div className="h-fit z-10 flex justify-between gap-8">
        {/* Story Info */}
        <StoryInfo story={story} />
        {/* Basic Info Section */}
        <StorySidebar story={story} />
      </div>

      {/* Characters Section */}
      {story.characters && story.characters.length > 0 ? (
        <StoryCharacters
          story={story}
          toggleExpand={toggleExpand}
          closeExpand={closeExpand}
          selectedCharacter={selectedCharacter}
          isStoryLocked={story.is_locked}
        />
      ) : (
        <div className="mt-12 z-10">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
            No Characters Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default StoryPageContent;
