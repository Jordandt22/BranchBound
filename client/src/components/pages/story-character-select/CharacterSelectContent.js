"use client";

import React, { useState } from "react";
import useSWR from "swr";

// Enums
import { errors } from "@/lib/enums/errors";
import { DEFAULT_SWR_OPTIONS } from "@/lib/swr/fetchers";

// Contexts
import { useUser } from "@/contexts/User.context";
import { useUserStoriesAPI } from "@/contexts/API/UserStoriesAPI.context";

// Utils
import { generateElementKey } from "@/lib/utils";

// Components
import ErrorDisplay from "@/components/pages/error/ErrorDisplay";
import CharacterSelectCard from "./CharacterSelectCard";
import ComingSoonCard from "./ComingSoonCard";
import { Button } from "@/components/ui/button";

function CharacterSelectContent({ story, userStoryID }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const { user } = useUser();
  const { getUserStory } = useUserStoriesAPI();
  const {
    data: rawData,
    isLoading,
    error,
  } = useSWR(
    user ? ["user-story", user?.uid, userStoryID] : null,
    ([key, uid, userStoryID]) => getUserStory(uid, userStoryID),
    DEFAULT_SWR_OPTIONS
  );

  const toggleSelectedCharacter = (characterId) =>
    setSelectedCharacter((prev) => (prev === characterId ? null : characterId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !rawData) {
    return <ErrorDisplay error={error || errors.LOADING_ERROR} />;
  }

  const data = rawData.data.data;
  const characters = story?.characters || [];
  const totalCards = 4;
  const comingSoonCount = Math.max(0, totalCards - characters.length);

  return (
    <div className="w-full relative">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
          Select Your Character
        </h1>
        <p className="text-text-secondary text-sm md:text-base">
          Choose a character to begin your adventure in {story?.title}
        </p>
      </div>

      {/* Character Grid */}
      {characters.length > 0 || comingSoonCount > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {characters.map((character) => (
            <CharacterSelectCard
              key={generateElementKey(
                "character-select",
                character.character_id
              )}
              selectedCharacter={selectedCharacter}
              toggleSelectedCharacter={toggleSelectedCharacter}
              character={character}
              storySlug={story?.slug}
            />
          ))}
          {Array.from({ length: comingSoonCount }).map((_, index) => (
            <ComingSoonCard key={`coming-soon-${index}`} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <p className="text-text-secondary text-lg bg-surface-hover/50 py-4 px-8 rounded-lg">
            No characters available for this story.
          </p>
        </div>
      )}

      {/* Form Buttons */}
      <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-4 mt-12 md:mt-8">
        <Button className="w-full md:w-fit rounded-full bg-transparent border-2 border-surface-hover text-white font-semibold py-6 px-12 text-md transition-all duration-300 cursor-pointer hover:scale-95 hover:bg-surface-hover">
          Cancel
        </Button>

        <Button
          disabled={!selectedCharacter}
          className={`w-full md:w-fit rounded-full text-white font-semibold py-6 px-24 text-md transition-all duration-300${
            selectedCharacter
              ? "bg-accent-primary hover:bg-accent-primary cursor-pointer hover:scale-95"
              : "bg-gray-700/50 opacity-50 cursor-not-allowed"
          }`}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default CharacterSelectContent;
