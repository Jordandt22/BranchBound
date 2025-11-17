import React from "react";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { Share2 } from "lucide-react";

function ShareButton() {
  return (
    <Button
      size="lg"
      className="rounded-3xl md:rounded-md px-5 py-2 w-full md:w-auto z-10 bg-surface-hover hover:bg-surface/70 hover:scale-95 transition-all duration-300 text-white cursor-pointer"
    >
      <Share2 size={20} />
      <span className="block md:hidden">Share</span>
    </Button>
  );
}

export default ShareButton;
