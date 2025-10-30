import React, { createContext, useContext, useState } from "react";

// Contexts
import { useToast } from "@/contexts/Toast.context";
import { useMediaQuery } from "usehooks-ts";

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

  // Sidebar State
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarState, setSidebarState] = useState({
    isCollapsed: isMobile ? true : false,
    searchValue: "",
    isProfileMenuOpen: false,
  });

  const toggleSidebar = (isCollapsed = null) => {
    setSidebarState((curState) => ({
      ...curState,
      isCollapsed: isCollapsed !== null ? isCollapsed : !curState.isCollapsed,
    }));
  };

  const toggleProfileMenu = (isProfileMenuOpen = null) => {
    setSidebarState((curState) => ({
      ...curState,
      isProfileMenuOpen:
        isProfileMenuOpen !== null
          ? isProfileMenuOpen
          : !curState.isProfileMenuOpen,
    }));
  };

  const updateSearchValue = (value) => {
    setSidebarState((curState) => ({
      ...curState,
      searchValue: value,
    }));
  };

  return (
    <GlobalContext.Provider
      value={{
        // Loading State
        loadingState,
        showLoading,
        hideLoading,

        // Error State
        errorState,
        showError,
        hideError,

        // Toasts
        showSuccess,
        showWarning,
        showInfo,

        // Sidebar State
        isMobile,
        sidebarState,
        toggleSidebar,
        updateSearchValue,
        toggleProfileMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
