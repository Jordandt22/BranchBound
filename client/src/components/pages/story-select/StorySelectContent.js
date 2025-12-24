"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

// Icons
import { ListChecks, FileText, User, Users } from "lucide-react";

// Utils
import { CARD_STYLES_NO_HOVER } from "@/lib/constants/styles";
import { getStoryImageURL } from "@/lib/utils";
import { THREE_TO_TWO } from "@/lib/constants/aspectRatios";
import {
  GAME_MODES,
  SESSION_TYPES,
  STORY_LENGTHS,
} from "@/lib/enums/storySelect";

// Components
import BackgroundImage from "@/components/pages/discover/featured/BackgroundImage";
import FormSection from "@/components/pages/story-select/FormSection";
import SelectButton from "@/components/pages/story-select/SelectButton";
import StoryLengthButton from "@/components/pages/story-select/StoryLengthButton";
import StorySection from "@/components/pages/story-select/StorySection";
import FormButtons from "@/components/pages/story-select/FormButtons";

const StorySelectContent = ({ story }) => {
  const [storySettings, setStorySettings] = useState({
    gameMode: GAME_MODES.CHOICES.value,
    playerMode: SESSION_TYPES.SINGLEPLAYER.value,
    storyLength: STORY_LENGTHS.MEDIUM.value,
  });

  const updateGameMode = (value) => {
    setStorySettings({ ...storySettings, gameMode: value });
  };

  const updatePlayerMode = (value) => {
    setStorySettings({ ...storySettings, playerMode: value });
  };

  const updateStoryLength = (value) => {
    setStorySettings({ ...storySettings, storyLength: value });
  };

  const storyLengthOptions = [
    {
      text: STORY_LENGTHS.SHORT.label,
      subText: "10 scenes",
      value: STORY_LENGTHS.SHORT.value,
      isLocked: false,
    },
    {
      text: STORY_LENGTHS.MEDIUM.label,
      subText: "20 scenes",
      value: STORY_LENGTHS.MEDIUM.value,
      isLocked: false,
    },
    {
      text: STORY_LENGTHS.LONG.label,
      subText: "30 scenes",
      value: STORY_LENGTHS.LONG.value,
      isLocked: false,
    },
    {
      text: STORY_LENGTHS.UNLIMITED.label,
      subText: "Unlimited scenes",
      value: STORY_LENGTHS.UNLIMITED.value,
      isLocked: true,
    },
  ];

  const gameModeOptions = [
    {
      text: GAME_MODES.CHOICES.label,
      value: GAME_MODES.CHOICES.value,
      icon: ListChecks,
      isLocked: false,
    },
    {
      text: GAME_MODES.TEXT_BASED.label,
      value: GAME_MODES.TEXT_BASED.value,
      icon: FileText,
      isLocked: true,
    },
  ];

  const sessionTypeOptions = [
    {
      text: SESSION_TYPES.SINGLEPLAYER.label,
      value: SESSION_TYPES.SINGLEPLAYER.value,
      icon: User,
      isLocked: false,
    },
    {
      text: SESSION_TYPES.MULTIPLAYER.label,
      value: SESSION_TYPES.MULTIPLAYER.value,
      icon: Users,
      isLocked: true,
    },
  ];

  return (
    <div className="w-full relative">
      {/* Background Image */}
      <BackgroundImage imageUrl={getStoryImageURL(story.slug, THREE_TO_TWO)} />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side - Form (70% on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[70%] space-y-8"
        >
          <div className={`${CARD_STYLES_NO_HOVER} p-6 lg:p-8`}>
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-8">
              Customize Your Story
            </h2>

            {/* Game Mode Selection */}
            <FormSection label="Game Mode">
              {gameModeOptions.map((option) => (
                <SelectButton
                  key={option.value}
                  onClick={() => updateGameMode(option.value)}
                  text={option.text}
                  isActive={storySettings.gameMode === option.value}
                  icon={option.icon}
                  isLocked={option.isLocked}
                />
              ))}
            </FormSection>

            {/* Session Type Selection */}
            <FormSection label="Session Type">
              {sessionTypeOptions.map((option) => (
                <SelectButton
                  key={option.value}
                  onClick={() => updatePlayerMode(option.value)}
                  text={option.text}
                  isActive={storySettings.playerMode === option.value}
                  icon={option.icon}
                  isLocked={option.isLocked}
                />
              ))}
            </FormSection>

            {/* Story Length Selection */}
            <FormSection label="Story Length">
              {storyLengthOptions.map((option) => (
                <StoryLengthButton
                  key={option.value}
                  onClick={() => updateStoryLength(option.value)}
                  text={option.text}
                  isActive={storySettings.storyLength === option.value}
                  subText={option.subText}
                  isLocked={option.isLocked}
                />
              ))}
            </FormSection>

            {/* Form Buttons */}
            <FormButtons story={story} storySettings={storySettings} />
          </div>
        </motion.div>

        {/* Right Side - Story Info (30% on desktop) */}
        <StorySection story={story} />
      </div>
    </div>
  );
};

export default StorySelectContent;
