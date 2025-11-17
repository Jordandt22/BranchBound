"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

// Utils
import { getCharacterImageURL } from "@/lib/utils";
import { FOUR_TO_FIVE } from "@/lib/constants/aspectRatios";
import { CARD_STYLES } from "@/lib/constants/styles";

// Components
import PlayButton from "@/components/layout/buttons/PlayButton";
import FavoriteButton from "@/components/layout/buttons/FavoriteButton";
import ShareButton from "@/components/layout/buttons/ShareButton";
import CharacterStoryCard from "./CharacterStoryCard";

const COLLAPSED_BACKSTORY_HEIGHT = 144;

const BackstorySection = ({ backstory }) => {
  const trimmedBackstory = (backstory ?? "").trim();
  const hasBackstory = Boolean(trimmedBackstory);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(
    COLLAPSED_BACKSTORY_HEIGHT
  );
  const contentRef = useRef(null);

  useEffect(() => {
    if (!hasBackstory || !contentRef.current) return;
    setContentHeight(contentRef.current.scrollHeight);
  }, [trimmedBackstory, hasBackstory]);

  if (!hasBackstory) {
    return (
      <p className="text-sm leading-relaxed h-auto text-text-secondary">
        No backstory available.
      </p>
    );
  }

  const collapsedHeight = Math.min(contentHeight, COLLAPSED_BACKSTORY_HEIGHT);
  const shouldShowToggle = contentHeight > COLLAPSED_BACKSTORY_HEIGHT + 16;

  return (
    <>
      <motion.div
        className="relative overflow-hidden"
        animate={{
          height: isExpanded ? contentHeight : collapsedHeight,
        }}
        initial={false}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div ref={contentRef}>
          <p
            className={`text-sm leading-relaxed h-auto text-text-secondary whitespace-pre-line ${
              isExpanded ? "" : "line-clamp-6"
            }`}
          >
            {trimmedBackstory}
          </p>
        </div>
      </motion.div>
      <AnimatePresence>
        {shouldShowToggle && (
          <motion.button
            type="button"
            key="backstory-toggle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-2 inline-flex items-center gap-1 text-accent-primary hover:text-accent-hover/80 text-sm font-medium transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ChevronDown size={16} />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

const CharacterHero = ({ character }) => {
  const storySlug = character?.default_story?.slug;
  const heroImageUrl = storySlug
    ? getCharacterImageURL(storySlug, character.slug, FOUR_TO_FIVE)
    : null;
  const backstory = character.long_desc || character.short_desc || "";

  const traits = character?.traits
    ? character.traits
        .split(",")
        .map((trait) => trait.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="relative z-10 rounded-3xl flex flex-col gap-8 md:flex-row">
      <div className="relative w-1/3 rounded-2xl shadow-md h-auto group/character">
        {heroImageUrl ? (
          <div className="relative h-full w-full aspect-square overflow-hidden rounded-2xl bg-surface">
            <Image
              src={heroImageUrl}
              alt={character.name}
              fill
              priority
              className="object-top object-cover w-full h-full rounded-2xl transition-all duration-400 group-hover/character:scale-110"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface aspect-square rounded-2xl">
            <Sparkles className="text-accent-primary" size={32} />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent rounded-2xl" />

        <div className="absolute bottom-0 left-0 w-full p-6 text-left">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-accent-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-primary">
              Character Profile
            </span>
            {character.is_locked && (
              <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-400">
                <Lock size={12} /> Locked
              </span>
            )}
          </div>
          <h1 className="font-merriweather text-3xl text-white drop-shadow-lg md:text-4xl">
            {character.name}
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 w-1/3 h-full">
        <div className="space-y-6 h-full">
          <div className="h-full">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-text-secondary">
              Traits
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {traits.length > 0 ? (
                traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-gray-700 bg-surface/70 px-3 py-1 text-xs font-medium text-text-primary backdrop-blur capitalize"
                  >
                    {trait}
                  </span>
                ))
              ) : (
                <span className="text-sm text-text-secondary">
                  No traits listed
                </span>
              )}
            </div>
          </div>

          <div className={`${CARD_STYLES} p-6 h-full`}>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-text-secondary mb-4">
              Backstory
            </p>
            <BackstorySection key={backstory} backstory={backstory} />
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <PlayButton
                isLocked={character.is_locked}
                story={character.default_story}
              />
              <FavoriteButton isLocked={character.is_locked} />
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/3">
        <CharacterStoryCard story={character.default_story} />
      </div>
    </section>
  );
};

export default CharacterHero;
