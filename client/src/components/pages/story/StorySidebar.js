import React from "react";

// Constants
import { CARD_STYLES } from "@/lib/constants/styles";

// Components
import PlayButton from "@/components/layout/buttons/PlayButton";
import FavoriteButton from "@/components/layout/buttons/FavoriteButton";
import ShareButton from "@/components/layout/buttons/ShareButton";
import AdjustableTextBox from "@/components/layout/AdjustableTextBox";

function StorySidebar({ story }) {
  return (
    <div className="flex flex-col gap-6 w-full md:w-2/5">
      {story.long_desc && (
        <AdjustableTextBox
          title="Description"
          content={story.long_desc}
          containerClass="md:hidden block"
        />
      )}
      {/* Tone and World Description */}
      {story.tone && (
        <div className={`${CARD_STYLES} p-6`}>
          <h3 className="text-white font-semibold mb-2">Tone / Mood</h3>
          <p className="text-text-secondary text-sm leading-relaxed capitalize">
            {story.tone}
          </p>
        </div>
      )}
      {story.world_desc && (
        <AdjustableTextBox
          title="World Description"
          content={story.world_desc}
        />
      )}

      {/* Start Story Button */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <PlayButton isLocked={story.is_locked} story={story} />
        <FavoriteButton isLocked={story.is_locked} />
        <ShareButton />
      </div>
    </div>
  );
}

export default StorySidebar;
