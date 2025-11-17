"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

// Utils
import { generateElementKey } from "@/lib/utils";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Discover", href: "/discover" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "Email", href: "mailto:support@branchbound.com", icon: Mail },
];

function Footer() {
  return (
    <footer className="relative z-10 pb-16 md:pb-0">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-14">
        <div className="flex flex-col gap-12 md:gap-24 md:flex-row md:items-start md:justify-between">
          <div className="md:max-w-sm">
            <h2 className="font-merriweather text-2xl text-white tracking-wide">
              BranchBound
            </h2>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              Dive into cinematic, choice-driven narratives. Build characters,
              explore branching storylines, and curate immersive adventures.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={generateElementKey("social-link", label)}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition-colors duration-200 hover:border-accent-primary hover:text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid flex-1 gap-10 sm:grid-cols-2">
            {footerLinks.map(({ title, links }) => (
              <div key={generateElementKey("footer-link", title)}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
                  {title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {links.map(({ label, href }) => (
                    <li key={generateElementKey("footer-link-item", label)}>
                      <Link
                        href={href}
                        className="text-text-secondary transition-colors duration-200 hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-xs text-text-secondary md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BranchBound. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700 hidden md:inline">•</span>
            <Link href="/tos" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-700 hidden md:inline">•</span>
            <Link
              href="/support"
              className="hover:text-white transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
