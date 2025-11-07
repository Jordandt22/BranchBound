import React from "react";

function MainPageWrapper({ Header, children }) {
  return (
    <div className="w-full pb-24">
      {/* Header */}
      {Header && <div className="relative z-10 px-6 py-4">{Header}</div>}

      {/* Main Content */}
      <main className="flex-1 py-6 px-6">{children}</main>
    </div>
  );
}

export default MainPageWrapper;
