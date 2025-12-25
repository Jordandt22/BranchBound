import React from "react";

// Components
import CharacterChoices from "@/components/pages/story-select/character/CharacterChoices";

function CharacterDescription({ selectedCharacter }) {
  return (
    <div className="bg-surface p-6 mt-8 rounded-lg">
      {!selectedCharacter ? (
        <p className="text-text-secondary text-base text-center">
          Please select a character to start
        </p>
      ) : (
        <div className="w-full h-full">
          <h2 className="text-white font-semibold mb-2">
            {selectedCharacter.name}
          </h2>
          <p className="text-text-secondary text-base">
            {selectedCharacter.short_desc}
          </p>
          <h2 className="text-white font-semibold mt-6">Character Choices</h2>
          <CharacterChoices character={selectedCharacter} />
        </div>
      )}
    </div>
  );
}

export default CharacterDescription;
