"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const FeaturedBanner = ({ story }) => {
  const [currentStory, setCurrentStory] = useState(story);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevStoryIdRef = useRef(story.story_id);

  useEffect(() => {
    if (story.story_id !== prevStoryIdRef.current) {
      prevStoryIdRef.current = story.story_id;
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentStory(story);
          setIsTransitioning(false);
        }, 300);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [story]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden group/active-story">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentStory.image_url}
          alt={currentStory.title}
          fill
          className={`object-cover group-hover/active-story:scale-110 group-hover/active-story:rotate-3 transition-all duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col justify-end p-8 transition-all duration-500 ${
          isTransitioning
            ? "opacity-0 transform translate-y-4"
            : "opacity-100 transform translate-y-0"
        }`}
      >
        <div className="max-w-2xl">
          <h1 className="text-white text-4xl font-bold mb-4 leading-tight">
            {currentStory.title}
          </h1>
          <p className="text-gray-200 text-lg mb-6 leading-relaxed line-clamp-4">
            {currentStory.long_desc}
          </p>
          <Link
            href={`/story/${currentStory.slug}`}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105"
          >
            <span className="font-medium">More Details</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
