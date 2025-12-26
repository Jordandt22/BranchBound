"use client";

import React from "react";
import { Clock } from "lucide-react";

const ComingSoonCard = () => {
  return (
    <div className="relative w-full aspect-4/5 rounded-lg border-2 border-gray-700/50 overflow-hidden opacity-60 cursor-not-allowed bg-surface/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-surface via-surface/50 to-surface/30" />

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`,
        }}
      />

      {/* Coming Soon Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-2">
        <Clock className="text-white/40 mb-3" size={32} />
        <h3 className="text-white/60 font-semibold text-lg md:text-xl mb-1 text-center">
          Coming Soon
        </h3>
        <p className="text-white/40 text-xs text-center">
          More characters arriving soon
        </p>
      </div>
    </div>
  );
};

export default ComingSoonCard;
