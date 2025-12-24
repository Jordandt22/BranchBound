import React from "react";

// Utils
import { getStoryBySlug } from "@/app/(protected)/story/[slug]/page";

// Components
import ErrorDisplay from "@/components/pages/error/ErrorDisplay";
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";

async function CharacterSelectPage({ params }) {
  const { slug: paramSlug, user_story_id } = await params;
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
            {
              label: "Character Selection",
              href: `/story/${slug}/select/${user_story_id}/characters`,
            },
          ]}
        />
      }
    >
      {user_story_id}
    </MainPageWrapper>
  );
}

export default CharacterSelectPage;
