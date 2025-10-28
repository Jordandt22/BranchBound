"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// Components
import CustomToast from "@/components/state/CustomToast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (options) => {
      return addToast(options);
    },
    [addToast]
  );

  const success = useCallback(
    (title, message, options = {}) => {
      return addToast({
        type: "success",
        title,
        message,
        duration: 4000,
        ...options,
      });
    },
    [addToast]
  );

  const error = useCallback(
    (title, message, options = {}) => {
      return addToast({
        type: "error",
        title,
        message,
        duration: 5000,
        ...options,
      });
    },
    [addToast]
  );

  const warning = useCallback(
    (title, message, options = {}) => {
      return addToast({
        type: "warning",
        title,
        message,
        duration: 4500,
        ...options,
      });
    },
    [addToast]
  );

  const info = useCallback(
    (title, message, options = {}) => {
      return addToast({
        type: "info",
        title,
        message,
        duration: 4000,
        ...options,
      });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toast,
        success,
        error,
        warning,
        info,
        removeToast,
      }}
    >
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
