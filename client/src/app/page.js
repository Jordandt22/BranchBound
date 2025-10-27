"use client";

// Contexts
import { useAuth } from "@/contexts/Auth.context";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <a href="/auth/signup">Signup</a>
      <button onClick={async () => await signOut()}>Signout</button>
    </div>
  );
}
