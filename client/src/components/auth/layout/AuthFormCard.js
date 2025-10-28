import React from "react";
import Link from "next/link";
import Image from "next/image";

function AuthFormCard({ title, description, children }) {
  return (
    <div className="fixed bottom-0 md:relative w-full max-w-md animate-fade-in">
      <div className="bg-surface backdrop-blur-sm rounded-t-2xl pb-16 md:rounded-2xl shadow-card p-6 md:p-8 space-y-6">
        {/* Back to Home Link */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent-primary hover:bg-accent-primary/10 hover:p-2 hover:px-6 rounded-full duration-200 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="hidden md:block w-20 h-20 relative">
              <Image
                src="/assets/images/logo.png"
                alt="BranchBound Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-merriweather">
              {title}
            </h1>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed font-inter">
              {description}
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthFormCard;
