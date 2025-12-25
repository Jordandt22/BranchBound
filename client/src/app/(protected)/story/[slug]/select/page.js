import React from "react";

// Enums
import { errors } from "@/lib/enums/errors";

// Utils
import { getStoryBySlug } from "@/app/(protected)/story/[slug]/page";

// Components
import ErrorDisplay from "@/components/pages/error/ErrorDisplay";
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import StorySelectContent from "@/components/pages/story-select/StorySelectContent";

async function StorySelectPage({ params }) {
  const { slug: paramSlug } = await params;
  const { data, error } = await getStoryBySlug(paramSlug);

  if (error || !data) {
    return <ErrorDisplay error={error || errors.LOADING_ERROR} />;
  }

  const { title, slug } = data;
  return <StorySelectContent story={data} />;
}

export default StorySelectPage;
