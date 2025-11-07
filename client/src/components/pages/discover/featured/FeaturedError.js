import React from "react";
import { AlertTriangle } from "lucide-react";

function FeaturedError({ error }) {
  const { code, message } = error;

  return (
    <div className="relative z-10 flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-3xl border border-gray-800 bg-surface/80 px-10 py-12 text-center shadow-card">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
        <AlertTriangle size={28} />
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.4em] text-text-secondary">
          {code}
        </p>
        <h2 className="font-merriweather text-2xl text-text-primary">
          Featured Stories Unavailable
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-text-secondary">
          {message ||
            "We couldn't load the featured carousel right now. Please try again in a moment or continue exploring other adventures."}
        </p>
      </div>
    </div>
  );
}

export default FeaturedError;
