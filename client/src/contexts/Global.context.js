import React, { createContext, useContext, useState } from "react";

// Contexts
import { useToast } from "@/contexts/Toast.context";

const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalProvider = ({ children }) => {
  const {
    error: showErrorToast,
    success: showSuccessToast,
    warning: showWarningToast,
    info: showInfoToast,
  } = useToast();

  // Loading State
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    message: "",
  });

  const showLoading = (message) => {
    setLoadingState({ isLoading: true, message });
  };

  const hideLoading = () => {
    setLoadingState({ isLoading: false, message: "" });
  };

  // Error State
  const [errorState, setErrorState] = useState({
    isError: false,
    message: "",
  });

  const showError = (message, title = "Error") => {
    setErrorState({ isError: true, message });
    showErrorToast(title, message);
  };

  const hideError = () => {
    setErrorState({ isError: false, message: "" });
  };

  // Success Toast
  const showSuccess = (message, title = "Success") => {
    showSuccessToast(title, message);
  };

  // Warning Toast
  const showWarning = (message, title = "Warning") => {
    showWarningToast(title, message);
  };

  // Info Toast
  const showInfo = (message, title = "Info") => {
    showInfoToast(title, message);
  };

  return (
    <GlobalContext.Provider
      value={{
        loadingState,
        showLoading,
        hideLoading,
        errorState,
        showError,
        hideError,
        showSuccess,
        showWarning,
        showInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
