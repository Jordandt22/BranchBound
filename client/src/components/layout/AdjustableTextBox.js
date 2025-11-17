"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CARD_STYLES } from "@/lib/constants/styles";

const COLLAPSED_CONTENT_HEIGHT = 144;

function AdjustableTextBox({ title, content, containerClass, children }) {
  const [contentExpanded, setContentExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!content || !contentRef.current) return;
    const timer = setTimeout(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [content, contentExpanded]);

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
      className={`${CARD_STYLES} p-6 ${containerClass || ""}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-white font-semibold">{title}</h3>
        <button
          type="button"
          onClick={() => setContentExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-hover/80 font-medium transition-colors text-sm shrink-0 cursor-pointer"
        >
          {contentExpanded ? (
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
          height: contentExpanded
            ? contentHeight
            : Math.min(contentHeight, COLLAPSED_CONTENT_HEIGHT),
        }}
        initial={false}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div ref={contentRef}>
          <p
            className={`whitespace-pre-line text-text-secondary text-sm leading-relaxed ${
              contentExpanded ? "" : "line-clamp-5"
            }`}
          >
            {content.trim()}
          </p>
        </div>
      </motion.div>

      {/* Extra Content */}
      {children}
    </motion.article>
  );
}

export default AdjustableTextBox;
