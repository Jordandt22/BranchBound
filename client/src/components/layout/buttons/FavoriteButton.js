import React from "react";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { Heart } from "lucide-react";

function FavoriteButton({ isLocked }) {
  return (
    <Button
      size="lg"
      disabled={isLocked}
      className={`w-full md:w-auto z-10 bg-red-400 hover:bg-red-500 hover:scale-95 transition-all duration-300 text-white cursor-pointer ${
        isLocked
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-red-400 hover:bg-red-500"
      }`}
    >
      <Heart size={20} />
      <span className="block md:hidden">Favorite</span>
    </Button>
  );
}

export default FavoriteButton;
