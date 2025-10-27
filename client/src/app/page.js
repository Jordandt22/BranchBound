"use client";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <a href="/signup">Signup</a>
      <button
        className="cursor-pointer bg-white px-8 py-2 mt-4 rounded-md text-black font-medium hover:bg-gray-300 transition-all duration-200"
        onClick={async () => await signOut()}
      >
        Signout
      </button>
    </div>
  );
}
