"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

// Utils
import { CARD_STYLES } from "@/lib/constants/styles";

const infoSections = [
  {
    key: "conflicts",
    title: "Core Conflicts",
    accessor: (character) => character.conflicts,
  },
  {
    key: "dilemmas",
    title: "Core Dilemmas",
    accessor: (character) => character.dilemmas,
  },
];

const COLLAPSED_CONTENT_HEIGHT = 120;

const ProfileInfoCard = ({ title, content }) => {
  const trimmedContent = (content ?? "").trim();
  const hasContent = Boolean(trimmedContent);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(COLLAPSED_CONTENT_HEIGHT);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!hasContent || !contentRef.current) return;
    setContentHeight(contentRef.current.scrollHeight);
  }, [trimmedContent, hasContent]);

  if (!hasContent) return null;

  const collapsedHeight = Math.min(contentHeight, COLLAPSED_CONTENT_HEIGHT);
  const shouldShowToggle = contentHeight > COLLAPSED_CONTENT_HEIGHT + 12;

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      className={`${CARD_STYLES} p-6 w-full h-fit`}
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-text-secondary">
        {title}
      </h3>
      <motion.div
        className="mt-4 overflow-hidden"
        animate={{
          height: isExpanded ? contentHeight : collapsedHeight,
        }}
        initial={false}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div ref={contentRef}>
          <p className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
            {trimmedContent}
          </p>
        </div>
      </motion.div>
      <AnimatePresence>
        {shouldShowToggle && (
          <motion.button
            type="button"
            key={`${title}-toggle`}
            layout
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
    </motion.article>
  );
};

const CharacterProfile = ({ character }) => {
  const sections = useMemo(
    () =>
      infoSections.map(({ key, title, accessor }) => {
        const content = accessor(character);
        return { key, title, content };
      }),
    [character]
  );

  const hasContent = sections.some(({ content }) => Boolean(content));

  if (!hasContent) return null;

  return (
    <>
      {sections.map(({ key, title, content }) => (
        <ProfileInfoCard key={key} title={title} content={content} />
      ))}
    </>
  );
};

export default CharacterProfile;
