import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// Contexts
import { useUser } from "@/contexts/User.context";
import { useUserStoriesAPI } from "@/contexts/API/UserStoriesAPI.context";
import { useGlobal } from "@/contexts/Global.context";

// Components
import { Button } from "@/components/ui/button";

function FormButtons({ story, storySettings }) {
  const router = useRouter();
  const { user } = useUser();
  const { createUserStory } = useUserStoriesAPI();
  const { showLoading, hideLoading } = useGlobal();

  const handleNext = async () => {
    showLoading("Creating your new adventure...");

    // Create User Story
    const res = await createUserStory(user.uid, story.story_id, storySettings);
    const rawData = res?.data;
    if (!rawData?.data || rawData?.error) {
      console.error(error);
    }

    // Data
    const data = rawData.data;

    // Send to Character Select Page
    router.push(`/story/${story.slug}/select/${data.user_story_id}/characters`);

    hideLoading();
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-4 mt-8 md:mt-16">
      <Button
        onClick={() => router.push("/story/" + story.slug)}
        className="w-full md:w-1/2 rounded-full bg-transparent border-2 border-surface-hover text-white font-semibold py-6 text-md transition-all duration-300 cursor-pointer hover:scale-95 hover:bg-surface-hover flex items-center justify-center"
      >
        <ArrowLeft size={20} />
        Back
      </Button>

      <Button
        onClick={handleNext}
        className="w-full md:w-1/2 rounded-full bg-accent-primary hover:bg-accent-hover text-white font-semibold py-6 text-md transition-all duration-300 cursor-pointer hover:scale-95 flex items-center justify-center"
      >
        Next
        <ArrowRight size={20} />
      </Button>
    </div>
  );
}

export default FormButtons;
