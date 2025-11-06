import React from "react";

// Fetchers
import { storiesFetcher } from "@/lib/swr/fetchers";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/handlers/errorHandlers";

// Components
import StoryPageContent from "@/components/pages/story/StoryPageContent";
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";

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
      error: {
        code: "server-error",
        message: "Sorry, there was an error with the server.",
      },
    };
  }
}

async function StoryPage({ params }) {
  const { slug } = await params;
  const { data, error } = await getStoryBySlug(slug);

  if (error || !data) {
    return <div>Error: {error?.message || DEFAULT_ERROR_MESSAGE}</div>;
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
