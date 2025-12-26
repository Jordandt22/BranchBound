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
  NO_ACCESS_TOKEN: "no-access-token",
  INVALID_ACCESS_TOKEN: "invalid-access-token",

  // Supabase
  SUPABASE_ERROR: "supabase-error",

  // Stories
  STORY_NOT_FOUND: "story-not-found",
  STORIES_NOT_FOUND: "stories-not-found",
  CHARACTER_NOT_FOUND: "character-not-found",

  // Users
  USER_NOT_FOUND: "user-not-found",
  EMAIL_USED: "email-used",
  USERNAME_USED: "username-used",
  INVALID_CREDENTIALS: "invalid-credentials",
  EMAIL_NOT_CONFIRMED: "email-not-confirmed",
  EMAIL_RATE_LIMIT: "email-rate-limit",

  // User Stories
  USER_STORY_ERROR: "user-story-error",
};

export const customErrorHandler = (code, message, error) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }

  console.error(`${code}:`, message);
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
