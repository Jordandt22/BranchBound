"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Constants
import { CARD_STYLES } from "@/lib/constants/styles";
import { FOUR_TO_FIVE } from "@/lib/constants/aspectRatios";

// Utils
import { getCharacterImageURL } from "@/lib/utils";

function CharacterGroupInfo({ character }) {
  const { character_group_id, character_group } = character;
  const storySlug = character?.default_story?.slug;

  const otherCharacters =
    character_group?.characters?.filter(
      (c) => c.character_id !== character.character_id
    ) || [];

  return (
    <div className={`${CARD_STYLES} p-6 w-full h-fit`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-text-secondary mb-4">
          Character Group
        </h3>
        {character_group_id && (
          <Link
            href={`/character-group/${character_group.slug}`}
            className="text-sm text-text-secondary hover:text-accent-primary transition-all duration-300 flex items-center gap-2"
          >
            View Group
            <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {character_group_id ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
              <strong>Name:</strong> {character_group.name}
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
              <strong>Description:</strong> {character_group.desc}
            </p>
          </div>

          {otherCharacters.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-text-secondary mb-4">
                Group Characters
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {otherCharacters.map((c) => {
                  const charStorySlug = c?.default_story?.slug || storySlug;
                  const imageUrl = charStorySlug
                    ? getCharacterImageURL(charStorySlug, c.slug, FOUR_TO_FIVE)
                    : null;

                  return (
                    <Link
                      key={c.character_id}
                      href={`/character/${c.slug}`}
                      className="group relative aspect-4/5 rounded-lg overflow-hidden transition-all duration-300"
                    >
                      {imageUrl ? (
                        <>
                          <Image
                            src={imageUrl}
                            alt={c.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <p className="text-white font-semibold text-md text-center px-2 drop-shadow-lg">
                              {c.name}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-surface/50 flex items-center justify-center">
                          <p className="text-text-secondary text-xs text-center px-2 line-clamp-2">
                            {c.name}
                          </p>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-text-secondary/60">
          This character is not part of a group
        </p>
      )}
    </div>
  );
}

export default CharacterGroupInfo;
