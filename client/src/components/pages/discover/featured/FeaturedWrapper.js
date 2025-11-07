import React from "react";

// Fetchers
import { storiesFetcher } from "@/lib/swr/fetchers";

// Components
import FeaturedSection from "./FeaturedSection";
import FeaturedError from "./FeaturedError";

export async function getFeaturedStories() {
  try {
    const data = await storiesFetcher("/featured");
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

async function FeaturedWrapper() {
  const { data, error } = await getFeaturedStories();

  if (error || !data) {
    return (
      <FeaturedError
        error={
          error || {
            code: "loading-error",
            message: "Sorry, an error occurred while loading this content.",
          }
        }
      />
    );
  }

  return <FeaturedSection stories={data} />;
}

export default FeaturedWrapper;
