import React from "react";

// Utils
import { generateElementKey } from "@/lib/utils";

// Components
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";

function Loading() {
  return (
    <MainPageWrapper
      Header={<MainHeader breadcrumbItems={[{ label: "Loading Story..." }]} />}
    >
      <div className="w-full">
        <div className="flex flex-col gap-8">
          <div className="space-y-6 w-full flex flex-col md:flex-row md:gap-8">
            <div className="aspect-3/2 w-full md:w-2/3 overflow-hidden rounded-3xl bg-surface animate-pulse" />

            <div className="space-y-6 w-full md:w-1/3">
              <div className="space-y-3 w-full rounded-3xl bg-surface/60 p-6">
                <div className="h-6 w-32 rounded-md bg-surface animate-pulse" />
                <div className="h-5 w-3/4 rounded-md bg-surface animate-pulse" />
                <div className="h-5 w-2/3 rounded-md bg-surface animate-pulse" />
              </div>

              <div className="space-y-4 w-full rounded-3xl bg-surface/60 p-6">
                <div className="h-6 w-40 rounded-md bg-surface animate-pulse" />
                <div className="space-y-3 w-full">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={generateElementKey("skeleton-story", index)}
                      className="h-4 w-full rounded-md bg-surface/80 animate-pulse"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2 md:flex-row w-full">
                  <div className="h-10 flex-1 rounded-md bg-surface animate-pulse" />
                  <div className="h-10 flex-1 rounded-md bg-surface animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl w-full mt-8 md:mt-0">
            <div className="flex flex-col gap-8 md:flex-row w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={generateElementKey("skeleton-story-card", index)}
                  className="w-full md:w-[15vw] rounded-2xl bg-surface/80 p-4 shadow-sm"
                >
                  <div className="h-48 w-full md:w-[15vw] rounded-xl bg-transparent animate-pulse" />
                  <div className="mt-4 space-y-3">
                    <div className="h-5 w-2/3 rounded-md bg-surface animate-pulse" />
                    <div className="h-4 w-3/4 rounded-md bg-surface/80 animate-pulse" />
                    <div className="h-4 w-1/2 rounded-md bg-surface/80 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
}

export default Loading;
