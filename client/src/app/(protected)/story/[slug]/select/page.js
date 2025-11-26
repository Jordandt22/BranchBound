import React from "react";

// Utils
import { getStoryBySlug } from "@/app/(protected)/story/[slug]/page";

// Components
import ErrorDisplay from "@/components/pages/error/ErrorDisplay";
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";
import StorySelectContent from "@/components/pages/story-select/StorySelectContent";

async function StorySelectPage({ params }) {
  const { slug: paramSlug } = await params;
  const { data, error } = await getStoryBySlug(paramSlug);

  if (error || !data) {
    return (
      <ErrorDisplay
        error={
          error || {
            code: "loading-error",
            message: "Sorry, an error occurred while loading this content.",
          }
        }
      />
    );
  }

  const { title, slug } = data;
  return (
    <MainPageWrapper
      Header={
        <MainHeader
          breadcrumbItems={[
            { label: title, href: `/story/${slug}` },
            { label: "Customize", href: `/story/${slug}/select` },
          ]}
        />
      }
    >
      <StorySelectContent story={data} />
    </MainPageWrapper>
  );
}

export default StorySelectPage;
