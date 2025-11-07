import React from "react";

// Components
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function Home() {
  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Hello World</h1>
        <a href="/signup">Signup</a>
      </div>
    </AuthWrapper>
  );
}
