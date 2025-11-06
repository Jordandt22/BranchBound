"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, X } from "lucide-react";

// Utils
import { getCharacterImageURL } from "@/lib/utils";
import { ONE_TO_ONE } from "@/lib/constants/aspectRatios";
import { Button } from "@/components/ui/button";

const CharacterCard = ({
  character,
  storySlug,
  toggleExpand,
  closeExpand,
  isSelected,
  isStoryLocked,
}) => {
  const isLocked = isStoryLocked || character.is_locked;

  return (
    <div
      className={`z-10 h-[30vh] bg-surface/10 rounded-lg border-2 overflow-hidden transition-all duration-300 ${
        isLocked
          ? "border-gray-700 opacity-75 cursor-not-allowed"
          : isSelected
          ? "flex flex-row w-[35vw] border-accent-primary cursor-pointer col-span-2 md:col-span-3 lg:col-span-4"
          : "w-[15vw] h-[15vh] border-black/25 hover:border-accent-primary hover:border-2 cursor-pointer hover:scale-95"
      }`}
      onClick={() => {
        if (isLocked) return;
        toggleExpand(character);
      }}
    >
      {/* Character Image */}
      <div
        className={`relative transition-all h-full duration-300 aspect-square ${
          isSelected ? "w-1/3" : "w-full"
        }`}
      >
        <Image
          src={getCharacterImageURL(storySlug, character.slug, ONE_TO_ONE)}
          alt={character.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 320px, 384px"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="text-white/80" size={32} />
          </div>
        )}
        {!isSelected && (
          <>
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg mb-1 drop-shadow-lg">
                {character.name}
              </h3>
              {!isLocked && (
                <p className="text-white/75 text-sm line-clamp-2 leading-relaxed drop-shadow-md">
                  {character.short_desc}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Character Info - Slides out when selected */}
      {isSelected && (
        <div className="flex-1 p-6 overflow-y-auto max-h-[400px] md:max-h-[500px] overflow-x-hidden">
          {/* Close Button */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-white text-xl font-bold">{character.name}</h2>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation();
                closeExpand();
              }}
              className="text-gray-400 hover:text-white hover:bg-surface-hover shrink-0 cursor-pointer"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Character Info */}
          <div className="flex flex-col justify-between gap-6">
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-5">
              {character.short_desc}
            </p>
            <Link
              href={`/character/${character.slug}`}
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/80 text-white/80 px-4 py-2 rounded-full hover:bg-accent-primary hover:border-accent-primary hover:text-white hover:scale-95 transition-all duration-300 text-center"
            >
              View Character <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
