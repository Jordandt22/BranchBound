import React from "react";

// Utils
import { generateElementKey } from "@/lib/utils";

// Components
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";

function Loading() {
  return (
    <MainPageWrapper
      Header={
        <MainHeader breadcrumbItems={[{ label: "Loading Character..." }]} />
      }
    >
      <div className="relative w-full">
        {/* Background Image Skeleton */}
        <div className="absolute inset-0 aspect-3/2 w-full overflow-hidden rounded-3xl bg-surface/30 animate-pulse" />

        <div className="relative z-10 flex flex-col gap-12">
          {/* Character Hero Section */}
          <section className="relative z-10 rounded-3xl flex flex-col gap-8 md:flex-row">
            {/* Character Image - 1/3 width */}
            <div className="relative w-full md:w-1/3 rounded-2xl shadow-md h-auto">
              <div className="relative h-full w-full aspect-square overflow-hidden rounded-2xl bg-surface animate-pulse" />
            </div>

            {/* Traits and Backstory - 1/3 width */}
            <div className="flex flex-col justify-between gap-6 w-full md:w-1/3 h-full">
              <div className="space-y-6 h-full">
                {/* Traits Section */}
                <div className="h-full">
                  <div className="h-4 w-20 rounded-md bg-surface/60 animate-pulse mb-3" />
                  <div className="mt-3 flex gap-2">
                    <div className="h-6 w-16 rounded-full bg-surface/60 animate-pulse" />
                    <div className="h-6 w-20 rounded-full bg-surface/60 animate-pulse" />
                    <div className="h-6 w-18 rounded-full bg-surface/60 animate-pulse" />
                  </div>
                </div>

                {/* Backstory Card */}
                <div className="rounded-3xl border-gray-800/50 bg-surface/70 backdrop-blur-sm border-2 p-6 h-full">
                  <div className="h-4 w-24 rounded-md bg-surface/60 animate-pulse mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
                    <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
                    <div className="h-4 w-3/4 rounded-md bg-surface/60 animate-pulse" />
                  </div>
                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3 mt-8">
                    <div className="h-10 w-32 rounded-3xl bg-surface/60 animate-pulse" />
                    <div className="h-10 w-10 rounded-full bg-surface/60 animate-pulse" />
                    <div className="h-10 w-10 rounded-full bg-surface/60 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Character Story Card - 1/3 width, hidden on mobile */}
            <div className="hidden md:block w-full md:w-1/3">
              <div className="rounded-3xl border-gray-800/50 bg-surface/70 backdrop-blur-sm border-2 p-6 h-full">
                <div className="h-48 w-full rounded-xl bg-surface/60 animate-pulse" />
                <div className="mt-4 space-y-3">
                  <div className="h-5 w-2/3 rounded-md bg-surface/60 animate-pulse" />
                  <div className="h-4 w-3/4 rounded-md bg-surface/60 animate-pulse" />
                  <div className="h-4 w-1/2 rounded-md bg-surface/60 animate-pulse" />
                </div>
              </div>
            </div>
          </section>

          {/* Profile and Choices Grid */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {/* Character Profile - 2 columns */}
            <div className="md:col-span-2 flex flex-col gap-8">
              {/* Conflicts and Dilemmas */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Conflicts Card */}
                <div className="w-full md:w-1/2 rounded-3xl border-gray-800/50 bg-surface/70 backdrop-blur-sm border-2 p-6">
                  <div className="h-4 w-32 rounded-md bg-surface/60 animate-pulse mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
                    <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
                    <div className="h-4 w-3/4 rounded-md bg-surface/60 animate-pulse" />
                  </div>
                </div>

                {/* Dilemmas Card */}
                <div className="w-full md:w-1/2 rounded-3xl border-gray-800/50 bg-surface/70 backdrop-blur-sm border-2 p-6">
                  <div className="h-4 w-32 rounded-md bg-surface/60 animate-pulse mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
                    <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
                    <div className="h-4 w-3/4 rounded-md bg-surface/60 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Character Group Info */}
              <div className="rounded-3xl border-gray-800/50 bg-surface/70 backdrop-blur-sm border-2 p-6">
                <div className="h-4 w-40 rounded-md bg-surface/60 animate-pulse mb-4" />
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded-md bg-surface/60 animate-pulse" />
                  <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
                  <div className="h-4 w-5/6 rounded-md bg-surface/60 animate-pulse" />
                </div>
                {/* Group Characters Grid */}
                <div className="mt-8">
                  <div className="h-4 w-32 rounded-md bg-surface/60 animate-pulse mb-3" />
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={generateElementKey(
                          "skeleton-group-characters",
                          index
                        )}
                        className="aspect-4/5 rounded-lg bg-surface/60 animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Character Choices - 1 column */}
            <aside className="space-y-8 w-full">
              {/* Signature Choices Card */}
              <div className="rounded-3xl border border-gray-800 bg-surface/70 p-6">
                <div className="h-4 w-40 rounded-md bg-surface/60 animate-pulse mb-3" />
                <div className="h-4 w-full rounded-md bg-surface/60 animate-pulse" />
              </div>

              {/* Choice Stats */}
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={generateElementKey("skeleton-choice-stats", index)}
                    className="relative rounded-2xl p-4 bg-surface/60 animate-pulse"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-surface/80 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 rounded-md bg-surface/80 animate-pulse" />
                        <div className="h-4 w-full rounded-md bg-surface/80 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
}

export default Loading;
