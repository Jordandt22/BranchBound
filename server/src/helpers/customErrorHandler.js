export const errorCodes = {
  // Server & Validation
  SERVER_ERROR: "server-error",
  YUP_ERROR: "form-error",
  TOO_MANY_REQUESTS: "too-many-requests",
  BOTS_DETECTED: "bots-detected",
  ACCESS_DENIED: "access-denied",
  ROUTE_NOT_FOUND: "route-not-found",
  NO_API_KEY: "no-api-key",
  INVALID_API_KEY: "invalid-api-key",

  // Supabase
  SUPABASE_ERROR: "supabase-error",

  // Stories
  STORY_NOT_FOUND: "story-not-found",
  STORIES_NOT_FOUND: "stories-not-found",
};

export const customErrorHandler = (code, message, error) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }

  console.error(`${code}:`);
  console.log(message);

  return {
    data: null,
    error: {
      code,
      message,
    },
  };
};

export const successHandler = (data) => {
  return {
    data,
    error: null,
  };
};
