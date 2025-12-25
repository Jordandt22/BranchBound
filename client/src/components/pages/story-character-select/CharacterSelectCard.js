"use client";

import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

// Utils
import { getCharacterImageURL } from "@/lib/utils";
import { FOUR_TO_FIVE } from "@/lib/constants/aspectRatios";

const CharacterSelectCard = ({
  character,
  storySlug,
  selectedCharacter,
  toggleSelectedCharacter,
}) => {
  const isLocked = character.is_locked;
  const isSelected = selectedCharacter === character.character_id;

  return (
    <div
      className={`relative w-full aspect-4/5 rounded-lg border-2 overflow-hidden transition-all duration-300 ${
        isLocked
          ? "border-gray-700 opacity-75 cursor-not-allowed"
          : isSelected
          ? "border-accent-primary border-2 hover:border-accent-primary/20 hover:border-2 cursor-pointer hover:scale-95"
          : "border-black/25 hover:border-accent-primary/70 hover:border-2 cursor-pointer hover:scale-95"
      }`}
      onClick={() => {
        if (!isLocked) toggleSelectedCharacter(character.character_id);
      }}
    >
      {/* Character Image */}
      <div className="relative w-full h-full">
        <Image
          src={getCharacterImageURL(storySlug, character.slug, FOUR_TO_FIVE)}
          alt={character.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-1" />

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <Lock className="text-white/80" size={24} />
          </div>
        )}

        {/* Character Name */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 z-2">
          <h3 className="text-white text-sm font-semibold md:text-xl mb-1">
            {character.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectCard;
