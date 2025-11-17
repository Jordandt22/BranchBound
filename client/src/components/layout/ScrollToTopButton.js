"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let scrollContainer = null;
    let cleanup = null;

    // Wait for DOM to be ready, then find scrollable container
    const initScrollListener = () => {
      // Find the scrollable container (the one with overflow-auto)
      const container = document.querySelector('[class*="overflow-auto"]');

      if (container) {
        scrollContainer = container;
        scrollContainerRef.current = container;
      } else {
        // Fallback to window if no container found
        scrollContainer = window;
      }

      const toggleVisibility = () => {
        const scrollTop =
          scrollContainer === window
            ? window.scrollY
            : scrollContainer.scrollTop;

        // Show button when scrolled down 100px (reduced threshold for testing)
        if (scrollTop > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      scrollContainer.addEventListener("scroll", toggleVisibility);
      // Check initial state
      toggleVisibility();

      cleanup = () => {
        scrollContainer.removeEventListener("scroll", toggleVisibility);
      };
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initScrollListener, 100);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  const scrollToTop = () => {
    const scrollContainer = scrollContainerRef.current || window;

    if (scrollContainer === window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.025 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 rounded-full bg-accent-primary hover:bg-accent-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;
