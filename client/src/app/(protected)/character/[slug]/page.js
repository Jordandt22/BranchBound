import React from "react";

// Fetchers
import { storiesFetcher } from "@/lib/swr/fetchers";

// Components
import MainPageWrapper from "@/components/layout/MainPageWrapper";
import MainHeader from "@/components/layout/MainHeader";
import ErrorDisplay from "@/components/pages/error/ErrorDisplay";
import CharacterPageContent from "@/components/pages/character/CharacterPageContent";

export async function getCharacterBySlug(slug) {
  try {
    const data = await storiesFetcher(`/character/${slug}`);
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

async function CharacterPage({ params }) {
  const { slug } = await params;
  const { data, error } = await getCharacterBySlug(slug);

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

  return (
    <MainPageWrapper
      Header={
        <MainHeader
          breadcrumbItems={[
            { label: "Discover", href: "/discover" },
            { label: data.name },
          ]}
        />
      }
    >
      <CharacterPageContent character={data} />
    </MainPageWrapper>
  );
}

export default CharacterPage;
