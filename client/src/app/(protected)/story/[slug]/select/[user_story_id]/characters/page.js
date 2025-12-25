import React from "react";

// Utils
import { getStoryBySlug } from "@/app/(protected)/story/[slug]/page";

// Enums
import { errors } from "@/lib/enums/errors";

// Components
import ErrorDisplay from "@/components/pages/error/ErrorDisplay";
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";
import CharacterSelectContent from "@/components/pages/story-character-select/CharacterSelectContent";

async function CharacterSelectPage({ params }) {
  const { slug: paramSlug, user_story_id } = await params;
  const { data, error } = await getStoryBySlug(paramSlug);

  if (error || !data) {
    return <ErrorDisplay error={error || errors.LOADING_ERROR} />;
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
      <CharacterSelectContent story={data} userStoryID={user_story_id} />
    </MainPageWrapper>
  );
}

export default CharacterSelectPage;
