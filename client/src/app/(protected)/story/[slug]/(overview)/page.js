import React from "react";

// Fetchers
import { storiesFetcher } from "@/lib/swr/fetchers";

// Enums
import { errors } from "@/lib/enums/errors";

// Components
import StoryPageContent from "@/components/pages/story/StoryPageContent";
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";
import ErrorDisplay from "@/components/pages/error/ErrorDisplay";

export async function getStoryBySlug(slug) {
  try {
    const data = await storiesFetcher(`/${slug}`);
    return { data, error: null };
  } catch (error) {
    if (error?.response?.data?.error) {
      return {
        data: null,
        error: error.response.data.error,
      };
    }
    return {
      data: null,
      error: errors.SERVER_ERROR,
    };
  }
}

async function StoryPage({ params }) {
  const { slug } = await params;
  const { data, error } = await getStoryBySlug(slug);

  if (error || !data) {
    return <ErrorDisplay error={error || errors.LOADING_ERROR} />;
  }

  return (
    <MainPageWrapper
      Header={
        <MainHeader
          breadcrumbItems={[
            { label: "Discover", href: "/discover" },
            { label: data.title },
          ]}
        />
      }
    >
      <StoryPageContent story={data} />
    </MainPageWrapper>
  );
}

export default StoryPage;
