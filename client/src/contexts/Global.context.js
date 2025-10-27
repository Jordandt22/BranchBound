import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);
export const GlobalProvider = ({ children }) => {
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

  return (
    <GlobalContext.Provider value={{ loadingState, showLoading, hideLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};
