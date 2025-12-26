import React from "react";
import { motion } from "framer-motion";

// Utils
import { generateElementKey } from "@/lib/utils";

// Components
import CharacterSelectCard from "@/components/pages/story-select/character/CharacterSelectCard";
import ComingSoonCard from "@/components/pages/story-select/character/ComingSoonCard";
import FormButtons from "@/components/pages/story-select/character/FormButtons";
import CharacterDescription from "@/components/pages/story-select/character/CharacterDescription";

function CharacterSelectContent({
  story,
  handleBackStep,
  selectedCharacter,
  toggleSelectedCharacter,
  handleStartStory,
}) {
  // Characters
  const characters = story?.characters || [];
  const totalCards = 4;
  const comingSoonCount = Math.max(0, totalCards - characters.length);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[85%] md:w-1/2 space-y-8"
    >
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

      {/* Character Description */}
      <CharacterDescription selectedCharacter={selectedCharacter} />

      {/* Form Buttons */}
      <FormButtons
        handleBackStep={handleBackStep}
        selectedCharacter={selectedCharacter}
        handleStartStory={handleStartStory}
      />
    </motion.div>
  );
}

export default CharacterSelectContent;
