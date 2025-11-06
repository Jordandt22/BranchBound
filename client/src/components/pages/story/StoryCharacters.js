"use client";

import React from "react";

// Components
import CharacterCard from "./CharacterCard";

function StoryCharacters({
  story,
  toggleExpand,
  closeExpand,
  selectedCharacter,
  isStoryLocked,
}) {
  return (
    <div className="mt-12 relative z-10">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 relative">
        Characters
      </h2>
      <div className="flex flex-wrap gap-6">
        {story.characters.map((character) => (
          <CharacterCard
            key={character.character_id}
            character={character}
            storySlug={story.slug}
            toggleExpand={toggleExpand}
            closeExpand={closeExpand}
            isSelected={
              selectedCharacter?.character_id === character.character_id
            }
            isStoryLocked={isStoryLocked}
          />
        ))}
      </div>
    </div>
  );
}

export default StoryCharacters;
