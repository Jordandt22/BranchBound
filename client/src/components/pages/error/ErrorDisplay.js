import React from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

// Components
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";

function ErrorDisplay({ error, addPadding = true }) {
  const { code = "unknown-error", message } = error || {};

  const displayMessage =
    message || "Something went wrong while loading this content.";

  return (
    <MainPageWrapper
      Header={<MainHeader breadcrumbItems={[{ label: "Error Page" }]} />}
      addPadding={addPadding}
    >
      <div className="h-full w-full flex flex-col items-center gap-6 rounded-xl px-8 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
          <AlertTriangle size={28} />
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-text-secondary">
            {code}
          </p>
          <h2 className="font-merriweather text-2xl text-text-primary">
            Oops! Something went wrong.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-md">
            {displayMessage}
          </p>
          <Link
            href="/discover"
            className="block text-sm text-white leading-relaxed max-w-md mt-8 bg-accent-primary px-8 py-2 rounded-full hover:bg-accent-primary/80 hover:scale-95 transition-all duration-200 cursor-pointer"
          >
            Go back to the Discover page
          </Link>
        </div>
      </div>
    </MainPageWrapper>
  );
}

export default ErrorDisplay;
