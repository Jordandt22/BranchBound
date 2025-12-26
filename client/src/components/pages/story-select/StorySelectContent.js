"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Utils
import {
  GAME_MODES,
  SESSION_TYPES,
  STORY_LENGTH_TYPES,
} from "@/lib/enums/storySelect";

// Contexts
import { useUserStoriesAPI } from "@/contexts/API/UserStoriesAPI.context";
import { useGlobal } from "@/contexts/Global.context";
import { useUser } from "@/contexts/User.context";
import { useError } from "@/contexts/Error.context";

// Components
import StorySection from "@/components/pages/story-select/StorySection";
import StorySelectForm from "@/components/pages/story-select/settings/StorySelectForm";
import FormStepper from "./FormStepper";
import CharacterSelectContent from "./character/CharacterSelectContent";

const StorySelectContent = ({ story }) => {
  const router = useRouter();

  // Current Step
  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handleBackStep = () => setCurrentStep((prevStep) => prevStep - 1);

  // Story Settings
  const [storySettings, setStorySettings] = useState({
    game_mode: GAME_MODES.CHOICES.value,
    session_type: SESSION_TYPES.SINGLEPLAYER.value,
    story_length_type: STORY_LENGTH_TYPES.MEDIUM.value,
  });

  const updateGameMode = (value) => {
    setStorySettings({ ...storySettings, game_mode: value });
  };

  const updatePlayerMode = (value) => {
    setStorySettings({ ...storySettings, session_type: value });
  };

  const updateStoryLength = (value) => {
    setStorySettings({ ...storySettings, story_length_type: value });
  };

  // Character Selection
  const [selectedCharacter, setSelectedCharacter] = useState(
    story.characters[0]
  );
  const toggleSelectedCharacter = (character) =>
    setSelectedCharacter((prev) =>
      prev?.character_id === character.character_id ? null : character
    );

  // Start Story
  const { createUserStory } = useUserStoriesAPI();
  const { showLoading, hideLoading, showError } = useGlobal();
  const { createUserStoryErrorHandler } = useError();
  const { user } = useUser();
  const handleStartStory = async () => {
    showLoading("Creating your new adventure...");

    try {
      const res = await createUserStory(
        user.uid,
        story.story_id,
        selectedCharacter.character_id,
        storySettings
      );
      const { data, error: APIError } = res?.data?.data;

      // Check for API Error
      if (APIError) return createUserStoryErrorHandler(APIError, showError);

      router.push(`/session/${data.user_story_id}/play`);
    } catch (err) {
      if (err?.response?.data) {
        const { error: APIError } = err.response.data;
        createUserStoryErrorHandler(APIError, showError);
      } else {
        showError(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="w-full min-h-full h-fit bg-linear-to-tr from-[#1a1e22] via-[#142127] to-[#070808] flex flex-col items-center justify-start pt-12 pb-32">
      <FormStepper currentStep={currentStep} />

      <StorySection story={story} />

      {currentStep === 1 ? (
        <StorySelectForm
          story={story}
          storySettings={storySettings}
          updateGameMode={updateGameMode}
          updatePlayerMode={updatePlayerMode}
          updateStoryLength={updateStoryLength}
          handleNextStep={handleNextStep}
        />
      ) : (
        <CharacterSelectContent
          story={story}
          handleBackStep={handleBackStep}
          selectedCharacter={selectedCharacter}
          toggleSelectedCharacter={toggleSelectedCharacter}
          handleStartStory={handleStartStory}
        />
      )}
    </div>
  );
};

export default StorySelectContent;
