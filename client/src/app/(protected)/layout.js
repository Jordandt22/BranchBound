"use client";

// Components
import ProtectedPage from "@/components/auth/ProtectedPage";

export default function ProtectedLayout({ children }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
