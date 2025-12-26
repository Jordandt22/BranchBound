import React from "react";
import { motion } from "motion/react";

// Constants
import {
  GAME_MODES,
  SESSION_TYPES,
  STORY_LENGTH_TYPES,
} from "@/lib/enums/storySelect";

// Components
import FormSection from "@/components/pages/story-select/settings/FormSection";
import SelectButton from "@/components/pages/story-select/settings/SelectButton";
import StoryLengthButton from "@/components/pages/story-select/settings/StoryLengthButton";
import FormButtons from "@/components/pages/story-select/settings/FormButtons";

function StorySelectForm({
  story,
  storySettings,
  updateGameMode,
  updatePlayerMode,
  updateStoryLength,
  handleNextStep,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[85%] md:w-1/2 space-y-8"
    >
      <h2 className="text-white text-2xl lg:text-3xl font-bold mb-8">
        Customize Your Story
      </h2>

      {/* Game Mode Selection */}
      <FormSection label="Game Mode">
        {Object.values(GAME_MODES).map((option) => (
          <SelectButton
            key={option.value}
            onClick={() => updateGameMode(option.value)}
            text={option.label}
            isActive={storySettings.game_mode === option.value}
            icon={option.icon}
            isLocked={option.isLocked}
          />
        ))}
      </FormSection>

      {/* Session Type Selection */}
      <FormSection label="Session Type">
        {Object.values(SESSION_TYPES).map((option) => (
          <SelectButton
            key={option.value}
            onClick={() => updatePlayerMode(option.value)}
            text={option.label}
            isActive={storySettings.session_type === option.value}
            icon={option.icon}
            isLocked={option.isLocked}
          />
        ))}
      </FormSection>

      {/* Story Length Selection */}
      <FormSection label="Story Length">
        {Object.values(STORY_LENGTH_TYPES).map((option) => (
          <StoryLengthButton
            key={option.value}
            onClick={() => updateStoryLength(option.value)}
            text={option.label}
            isActive={storySettings.story_length_type === option.value}
            subText={option.subText}
            isLocked={option.isLocked}
          />
        ))}
      </FormSection>

      {/* Form Buttons */}
      <FormButtons story={story} handleNextStep={handleNextStep} />
    </motion.div>
  );
}

export default StorySelectForm;
