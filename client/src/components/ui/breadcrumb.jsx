"use client";

import React from "react";
import Link from "next/link";

/**
 * Breadcrumb Component
 * @param {Array} items - Array of breadcrumb items. Each item should have:
 *   - label: string - The text to display
 *   - href: string (optional) - The link URL. If omitted, item is treated as current/active
 * @param {string} className - Additional CSS classes
 * @param {boolean} hideOnMobile - Whether to hide on mobile devices (default: true)
 */
function Breadcrumb({ items = [], className = "", hideOnMobile = true }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      className={`flex items-center gap-2 text-sm ${
        hideOnMobile ? "hidden md:flex" : ""
      } ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isActive = !item.href || isLast;

        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-white transition-colors"
                }
              >
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-text-secondary">/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
