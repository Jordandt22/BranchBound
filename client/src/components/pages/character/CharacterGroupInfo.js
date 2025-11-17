"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Constants
import { CARD_STYLES } from "@/lib/constants/styles";
import { FOUR_TO_FIVE, ONE_TO_ONE } from "@/lib/constants/aspectRatios";

// Utils
import { getCharacterImageURL, generateElementKey } from "@/lib/utils";

// Contexts
import { useGlobal } from "@/contexts/Global.context";

function CharacterGroupInfo({ character }) {
  const { isMobile } = useGlobal();
  const { character_group_id, character_group } = character;
  const storySlug = character?.default_story?.slug;

  const otherCharacters =
    character_group?.characters?.filter(
      (c) => c.character_id !== character.character_id
    ) || [];

  return (
    <div className={`${CARD_STYLES} p-6 w-full h-fit`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">
          {character_group?.name || "Character Group"}
        </h3>
        {character_group_id && (
          <Link
            href={`/character-group/${character_group.slug}`}
            className="text-sm text-text-secondary hover:text-accent-primary transition-all duration-300 flex items-center gap-2 bg-accent-primary/10 hover:bg-accent-primary/20 rounded-full px-4 md:px-8 py-1"
          >
            <span className="hidden md:block">View Group</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {character_group_id ? (
        <div className="flex flex-col gap-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
            {character_group?.desc}
          </p>

          {otherCharacters.length > 0 && (
            <div className="mt-4">
              <h3 className="text-white font-semibold mb-4">
                Group Characters
              </h3>
              <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                {otherCharacters.map((c) => {
                  const charStorySlug = c?.default_story?.slug || storySlug;
                  const imageUrl = charStorySlug
                    ? getCharacterImageURL(
                        charStorySlug,
                        c.slug,
                        isMobile ? ONE_TO_ONE : FOUR_TO_FIVE
                      )
                    : null;

                  return (
                    <>
                      {isMobile ? (
                        <Link
                          key={generateElementKey(
                            "mobile-character-group-character",
                            c.character_id
                          )}
                          href={`/character/${c.slug}`}
                          className="flex items-center gap-4 w-full bg-surface-hover rounded-md p-2"
                        >
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={c.name}
                              width={150}
                              height={150}
                              className="object-contain w-15 h-15 aspect-square rounded-sm"
                            />
                          )}

                          <p className="text-white text-sm font-bold line-clamp-2">
                            {c.name}
                          </p>
                        </Link>
                      ) : (
                        <Link
                          key={generateElementKey(
                            "desktop-character-group-character",
                            c.character_id
                          )}
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
                      )}
                    </>
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
