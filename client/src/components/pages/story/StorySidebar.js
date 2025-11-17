"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

// Constants
import { CARD_STYLES } from "@/lib/constants/styles";

// Components
import PlayButton from "@/components/layout/buttons/PlayButton";
import FavoriteButton from "@/components/layout/buttons/FavoriteButton";
import ShareButton from "@/components/layout/buttons/ShareButton";

const COLLAPSED_WORLD_DESC_HEIGHT = 120;
const COLLAPSED_LONG_DESC_HEIGHT = 144; // Approximately 6 lines of text

function StorySidebar({ story }) {
  const [isLongDescExpanded, setIsLongDescExpanded] = useState(false);
  const [isWorldDescExpanded, setIsWorldDescExpanded] = useState(false);
  const [worldDescHeight, setWorldDescHeight] = useState(
    COLLAPSED_WORLD_DESC_HEIGHT
  );
  const [longDescHeight, setLongDescHeight] = useState(
    COLLAPSED_LONG_DESC_HEIGHT
  );
  const worldDescRef = useRef(null);
  const longDescRef = useRef(null);

  useEffect(() => {
    if (!story.world_desc || !worldDescRef.current) return;
    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (worldDescRef.current) {
        setWorldDescHeight(worldDescRef.current.scrollHeight);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [story.world_desc, isWorldDescExpanded]);

  useEffect(() => {
    if (!story.long_desc || !longDescRef.current) return;
    const timer = setTimeout(() => {
      if (longDescRef.current) {
        setLongDescHeight(longDescRef.current.scrollHeight);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [story.long_desc, isLongDescExpanded]);

  return (
    <div className="flex flex-col gap-6 w-full md:w-2/5">
      {story.long_desc && (
        <motion.article
          layout
          transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
          className="block md:hidden bg-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold">Description</h3>
            {longDescHeight > COLLAPSED_LONG_DESC_HEIGHT + 12 && (
              <button
                type="button"
                onClick={() => setIsLongDescExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-hover/80 font-medium transition-colors text-sm shrink-0 cursor-pointer"
              >
                {isLongDescExpanded ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <ChevronDown size={14} />
                  </>
                )}
              </button>
            )}
          </div>
          <motion.div
            className="overflow-hidden"
            animate={{
              height: isLongDescExpanded
                ? longDescHeight
                : Math.min(longDescHeight, COLLAPSED_LONG_DESC_HEIGHT),
            }}
            initial={false}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div ref={longDescRef}>
              <p className="whitespace-pre-line text-text-secondary text-sm leading-relaxed">
                {story.long_desc}
              </p>
            </div>
          </motion.div>
        </motion.article>
      )}
      {/* Tone and World Description */}
      {story.tone && (
        <div className={`${CARD_STYLES} p-6`}>
          <h3 className="text-white font-semibold mb-2">Tone / Mood</h3>
          <p className="text-text-secondary text-sm leading-relaxed capitalize">
            {story.tone}
          </p>
        </div>
      )}
      {story.world_desc?.trim() && (
        <motion.article
          layout
          transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
          className={`${CARD_STYLES} p-6`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold">World Description</h3>
            <button
              type="button"
              onClick={() => setIsWorldDescExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-hover/80 font-medium transition-colors text-sm shrink-0 cursor-pointer"
            >
              {isWorldDescExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>Show More</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
          <motion.div
            className="overflow-hidden"
            animate={{
              height: isWorldDescExpanded
                ? worldDescHeight
                : Math.min(worldDescHeight, COLLAPSED_WORLD_DESC_HEIGHT),
            }}
            initial={false}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div ref={worldDescRef}>
              <p
                className={`whitespace-pre-line text-text-secondary text-sm leading-relaxed ${
                  isWorldDescExpanded ? "" : "line-clamp-5"
                }`}
              >
                {story.world_desc.trim()}
              </p>
            </div>
          </motion.div>
        </motion.article>
      )}

      {/* Start Story Button */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <PlayButton isLocked={story.is_locked} story={story} />
        <FavoriteButton isLocked={story.is_locked} />
        <ShareButton />
      </div>
    </div>
  );
}

export default StorySidebar;
