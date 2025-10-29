"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "./StoryCard";

const StoryCarousel = ({ title, stories }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const navButtonStyles =
    "flex items-center justify-center w-8 h-8 bg-surface/80 text-text-primary rounded-full shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer hover:bg-accent-dark";

  return (
    <div className="mb-16 group/carousel">
      {/* Section Title with Navigation */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-text-primary text-2xl font-bold">{title}</h2>
        <div className="gap-2 group-hover/carousel:flex hidden">
          <button onClick={scrollPrev} className={navButtonStyles}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={scrollNext} className={navButtonStyles}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2.5">
          {[...stories].map((story, index) => (
            <div
              key={story.story_id + "-" + index}
              className="w-48 h-64 md:w-48 flex-[0_0_85%] md:flex-none"
            >
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryCarousel;
