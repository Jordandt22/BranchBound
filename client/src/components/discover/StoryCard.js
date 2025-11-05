"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Utils
import { getStoryImageURL } from "@/lib/utils";
import { FOUR_TO_FIVE } from "@/lib/constants/aspectRatios";

const StoryCard = ({ story }) => {
  return (
    <Link
      href={`/story/${story.slug}`}
      className="block group/card w-full h-full"
    >
      <div className="bg-surface rounded-lg border-2 border-black/25 overflow-hidden transition-all duration-300 hover:scale-95 hover:border-accent-primary hover:border-2 w-full h-full relative">
        {/* Story Image */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={getStoryImageURL(story.slug, FOUR_TO_FIVE)}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-400 bg-black"
            sizes="(max-width: 768px) 100vw, 256px"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/15" />
        </div>

        {/* Story Content - Overlaid */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col">
          <h3 className="text-white font-semibold text-lg line-clamp-1 mb-1 group-hover/card:text-accent-primary transition-colors drop-shadow-lg">
            {story.title}
          </h3>
          <p className="text-white/75 text-sm line-clamp-2 leading-relaxed drop-shadow-md">
            {story.short_desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
