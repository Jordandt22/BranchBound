"use client";

import React from "react";

// Utils
import { getStoryImageURL } from "@/lib/utils";
import { THREE_TO_TWO } from "@/lib/constants/aspectRatios";

// Components
import BackgroundImage from "@/components/pages/discover/featured/BackgroundImage";
import CharacterHero from "@/components/pages/character/CharacterHero";
import CharacterProfile from "@/components/pages/character/CharacterProfile";
import CharacterChoices from "@/components/pages/character/CharacterChoices";
import CharacterStoryCard from "@/components/pages/character/CharacterStoryCard";

const CharacterPageContent = ({ character }) => {
  const storySlug = character?.default_story?.slug;
  const backgroundUrl = storySlug
    ? getStoryImageURL(storySlug, THREE_TO_TWO)
    : null;

  return (
    <div className="relative w-full">
      {backgroundUrl && <BackgroundImage imageUrl={backgroundUrl} />}

      <div className="relative z-10 flex flex-col gap-12">
        <CharacterHero character={character} />

        <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
          <CharacterProfile character={character} />
          <CharacterChoices character={character} />
        </div>

        <div className="block md:hidden">
          <CharacterStoryCard story={character.default_story} />
        </div>
      </div>
    </div>
  );
};

export default CharacterPageContent;
