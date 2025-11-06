import React from "react";

function MainPageWrapper({ Header, children }) {
  return (
    <div className="min-h-screen w-full pb-24">
      {/* Header */}
      <div className="relative z-10">{Header}</div>

      {/* Main Content */}
      <div className="py-6 px-6 mt-4 md:mt-0">{children}</div>
    </div>
  );
}

export default MainPageWrapper;
