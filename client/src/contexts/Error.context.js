import React, { createContext, useContext } from "react";

// Error Codes
import {
  errorCodes,
  createProfileErrorHandler,
  getUserErrorHandler,
} from "@/lib/handlers/errorHandlers";

// Contexts
import { useGlobal } from "@/contexts/Global.context";

const ErrorContext = createContext();
export const useError = () => useContext(ErrorContext);
export const ErrorProvider = ({ children }) => {
  const { showError } = useGlobal();

  // Error Handler Wrapper
  const errorHandlerWrapper = (errorHandler) => {
    return function (...args) {
      const { code, message } = args[0];
      if (process.env.NODE_ENV === "development")
        console.error(`ERROR: [${code}] ${message}`, args[0]);
      switch (code) {
        case errorCodes.SERVER_ERROR:
        case errorCodes.USER_CREATION_ERROR:
        case errorCodes.TOO_MANY_REQUESTS:
        case errorCodes.BOTS_DETECTED:
        case errorCodes.ACCESS_DENIED:
        case errorCodes.NO_API_KEY:
        case errorCodes.INVALID_API_KEY:
          showError(message, "Server Error");
          return {
            data: null,
            error: {
              code: null,
              message: "An unexpected error occurred. Please try again.",
            },
          };

        default:
          return errorHandler(...args);
      }
    };
  };

  return (
    <ErrorContext.Provider
      value={{
        createProfileErrorHandler: errorHandlerWrapper(
          createProfileErrorHandler
        ),
        getUserErrorHandler: errorHandlerWrapper(getUserErrorHandler),
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
