"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

// Utils
import { getStoryImageURL } from "@/lib/utils";
import { SIXTEEN_TO_NINE } from "@/lib/constants/aspectRatios";
import { CARD_STYLES } from "@/lib/constants/styles";

const CharacterStoryCard = ({ story }) => {
  if (!story?.slug) return null;

  return (
    <section className={`relative z-10 ${CARD_STYLES} p-6 h-full w-full`}>
      <div className="flex flex-col gap-6 w-full">
        <div className="relative h-[260px] w-full overflow-hidden rounded-2xl shadow-md group/story-card">
          <Image
            src={getStoryImageURL(story.slug, SIXTEEN_TO_NINE)}
            alt={story.title}
            fill
            className="object-cover w-full h-full aspect-video group-hover/story-card:scale-110 transition-all duration-400"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          {story.is_locked && (
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
              <Lock size={14} /> Locked Story
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              Default Story
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {story.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-6">
          <p className="text-sm leading-relaxed text-text-secondary">
            {story.short_desc}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/story/${story.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:bg-accent-primary/80 hover:scale-95"
            >
              View Story <ArrowRight size={18} />
            </Link>
            <Link
              href="/discover"
              className="rounded-full border border-gray-700 px-5 py-2 text-sm font-semibold text-text-primary transition-colors duration-200 hover:bg-gray-700 hover:text-white"
            >
              Discover More Stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterStoryCard;
