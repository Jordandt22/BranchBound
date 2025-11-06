"use client";

import React from "react";
import useSWR from "swr";

// Fetchers
import { storiesFetcher } from "@/lib/swr/fetchers";

// Constants
import { DEFAULT_ERROR_MESSAGE } from "@/lib/handlers/errorHandlers";

// Components
import FeaturedSection from "./FeaturedSection";

function FeaturedWrapper() {
  const { data, error } = useSWR("/featured", storiesFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
  });

  if (error || !data) {
    return <div>Error: {error?.message || DEFAULT_ERROR_MESSAGE}</div>;
  }

  return <FeaturedSection stories={data} />;
}

export default FeaturedWrapper;
