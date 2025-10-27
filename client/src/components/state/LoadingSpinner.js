"use client";

import React from "react";

// Contexts
import { useGlobal } from "@/contexts/Global.context";

function LoadingSpinner() {
  const { loadingState } = useGlobal();

  return (
    <>
      {loadingState.isLoading && (
        <div className="fixed inset-0 flex flex-col gap-6 items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-white text-2xl font-bold">
            {loadingState.message || "Loading..."}
          </p>
        </div>
      )}
    </>
  );
}

export default LoadingSpinner;
