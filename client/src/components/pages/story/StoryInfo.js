"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";

// Utils
import { getStoryImageURL } from "@/lib/utils";
import { SIXTEEN_TO_NINE } from "@/lib/constants/aspectRatios";

function StoryInfo({ story }) {
  const description = story.long_desc || story.short_desc;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="relative w-3/5 h-full aspect-video rounded-lg overflow-hidden z-10 group/story-info">
      <Image
        src={getStoryImageURL(story.slug, SIXTEEN_TO_NINE)}
        alt={story.title}
        fill
        className="object-cover group-hover/story-info:scale-110 group-hover/story-info:rotate-5 transition-all duration-500"
        priority
        sizes="(max-width: 768px) 100vw, 1280px"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/70 to-black/30" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <div className="max-w-4xl">
          {/* Genres */}
          {story.genres && story.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {story.genres.map((genre) => (
                <Link
                  key={genre.genre_id}
                  href={`/genres/${genre.slug}`}
                  className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-md text-sm hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <span>{genre.icon}</span>
                  <span>{genre.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
            {story.title}
          </h1>

          {/* Description with More/Less */}
          {description && (
            <div className="mb-4">
              <p
                className={`text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md ${
                  !isDescriptionExpanded ? "line-clamp-3" : ""
                }`}
              >
                {description}
              </p>
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-2 inline-flex items-center gap-1 text-accent-primary hover:text-accent-hover/80 font-medium transition-colors cursor-pointer"
              >
                {isDescriptionExpanded ? (
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
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryInfo;
