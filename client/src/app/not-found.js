"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { MapPinOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Utils
import { removeRedirectURL } from "@/lib/utils";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

function NotFound() {
  const { session } = useAuth();
  const router = useRouter();
  useEffect(() => {
    removeRedirectURL();
  }, []);

  const mainLinkStyle =
    "rounded-lg bg-accent-primary px-6 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-primary/80 hover:scale-95";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-bg px-6 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800/60 text-accent-primary">
          <MapPinOff size={36} />
        </div>

        <div className="space-y-3 mt-4">
          <p className="text-md uppercase tracking-[0.4em] text-text-secondary">
            404 error
          </p>
          <h1 className="font-merriweather text-3xl text-text-primary md:text-4xl">
            Looks Like You&apos;re Lost...
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-text-secondary">
            We couldn&apos;t find the story, character, or destination you were
            looking for. Maybe it was lost in an alternate timeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-gray-700 px-6 py-2 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-primary hover:text-white cursor-pointer"
          >
            Previous Page
          </button>

          {session ? (
            <Link href="/discover" className={mainLinkStyle}>
              Return to Discover
            </Link>
          ) : (
            <Link href="/" className={mainLinkStyle}>
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotFound;
