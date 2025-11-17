"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { Lock, Play } from "lucide-react";

function PlayButton({ isLocked, story }) {
  const router = useRouter();

  return (
    <Button
      size="lg"
      disabled={isLocked}
      className={`rounded-3xl px-5 py-2 w-full md:w-1/2 z-10 ${
        isLocked
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-accent-primary hover:bg-accent-hover text-white cursor-pointer hover:scale-95 transition-all duration-300"
      }`}
      onClick={() => {
        if (isLocked) return;
        router.push(`/story/${story.slug}/play`);
      }}
    >
      {isLocked ? (
        <>
          <Lock size={20} />
          <span>Story Locked</span>
        </>
      ) : (
        <>
          <Play size={20} />
          <span>Start Story</span>
        </>
      )}
    </Button>
  );
}

export default PlayButton;
