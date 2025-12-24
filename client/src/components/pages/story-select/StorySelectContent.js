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
  const [gameMode, setGameMode] = useState(GAME_MODES.CHOICES);
  const [playerMode, setPlayerMode] = useState(SESSION_TYPES.SINGLEPLAYER);
  const [storyLength, setStoryLength] = useState(STORY_LENGTHS.MEDIUM);

  const storyLengthOptions = [
    {
      text: "Short",
      subText: "10 scenes",
      value: STORY_LENGTHS.SHORT,
      isLocked: false,
    },
    {
      text: "Medium",
      subText: "20 scenes",
      value: STORY_LENGTHS.MEDIUM,
      isLocked: false,
    },
    {
      text: "Long",
      subText: "30 scenes",
      value: STORY_LENGTHS.LONG,
      isLocked: false,
    },
    {
      text: "Unlimited",
      subText: "Unlimited scenes",
      value: STORY_LENGTHS.UNLIMITED,
      isLocked: true,
    },
  ];

  const gameModeOptions = [
    {
      text: "Choices",
      value: GAME_MODES.CHOICES,
      icon: ListChecks,
      isLocked: false,
    },
    {
      text: "Text-based",
      value: GAME_MODES.TEXT_BASED,
      icon: FileText,
      isLocked: true,
    },
  ];

  const sessionTypeOptions = [
    {
      text: "Singleplayer",
      value: SESSION_TYPES.SINGLEPLAYER,
      icon: User,
      isLocked: false,
    },
    {
      text: "Multiplayer",
      value: SESSION_TYPES.MULTIPLAYER,
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
                  onClick={() => setGameMode(option.value)}
                  text={option.text}
                  isActive={gameMode === option.value}
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
                  onClick={() => setPlayerMode(option.value)}
                  text={option.text}
                  isActive={playerMode === option.value}
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
                  onClick={() => setStoryLength(option.value)}
                  text={option.text}
                  isActive={storyLength === option.value}
                  subText={option.subText}
                  isLocked={option.isLocked}
                />
              ))}
            </FormSection>

            {/* Form Buttons */}
            <FormButtons
              story={story}
              gameMode={gameMode}
              playerMode={playerMode}
              storyLength={storyLength}
            />
          </div>
        </motion.div>

        {/* Right Side - Story Info (30% on desktop) */}
        <StorySection story={story} />
      </div>
    </div>
  );
};

export default StorySelectContent;
