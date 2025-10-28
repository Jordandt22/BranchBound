export const errorCodes = {
  // Server & Validation
  SERVER_ERROR: "server-error",
  YUP_ERROR: "form-error",
  TOO_MANY_REQUESTS: "too-many-requests",
  BOTS_DETECTED: "bots-detected",
  ACCESS_DENIED: "access-denied",
  NO_API_KEY: "no-api-key",
  INVALID_API_KEY: "invalid-api-key",
  NO_ACCESS_TOKEN: "no-access-token",
  INVALID_ACCESS_TOKEN: "invalid-access-token",

  // Supabase
  SUPABASE_ERROR: "supabase-error",

  // Stories
  STORY_NOT_FOUND: "story-not-found",
  STORIES_NOT_FOUND: "stories-not-found",

  // Users
  USER_NOT_FOUND: "user-not-found",
  EMAIL_USED: "email-used",
  USERNAME_USED: "username-used",
  INVALID_CREDENTIALS: "invalid-credentials",
  EMAIL_NOT_CONFIRMED: "email-not-confirmed",
  EMAIL_RATE_LIMIT: "email-rate-limit",
};

export const DEFAULT_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again.";

// Create Profile Form
export const createProfileErrorHandler = (error, errorCB) => {
  switch (error.code) {
    case errorCodes.EMAIL_USED:
    case errorCodes.USERNAME_USED:
    case errorCodes.NO_ACCESS_TOKEN:
    case errorCodes.INVALID_ACCESS_TOKEN:
      return error.message;

    case errorCodes.YUP_ERROR:
      errorCB(error.message);
      break;

    default:
      return DEFAULT_ERROR_MESSAGE;
  }
};

// Get User
export const getUserErrorHandler = (error, showError) => {
  const errorTitle = "Error: Getting User Data";

  switch (error.code) {
    case errorCodes.USER_NOT_FOUND:
      showError(error.message, errorTitle);
      break;

    case errorCodes.NO_ACCESS_TOKEN:
    case errorCodes.INVALID_ACCESS_TOKEN:
      showError("Please log in to continue.", errorTitle);
      break;

    default:
      showError(DEFAULT_ERROR_MESSAGE, errorTitle);
      break;
  }
};
