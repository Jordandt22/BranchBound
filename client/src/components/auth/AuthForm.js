"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Contexts
import { useSupabase } from "@/contexts/Supabase.context";

// Components
import AuthBackground from "./AuthBackground";
import AuthFormCard from "./AuthFormCard";

export default function AuthForm({ title, description, type = "signup" }) {
  const { supabase } = useSupabase();
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        setError("Failed to sign in with Google. Please try again.");
        console.error(error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <AuthBackground>
      {/* Main Card */}
      <AuthFormCard title={title} description={description}>
        {/* Error Message */}
        {error && (
          <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl text-sm animate-slide-in shadow-error">
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="group/auth-btn w-full flex items-center justify-center gap-3 bg-white rounded-full py-4 px-6 mt-8 cursor-pointer hover:scale-95 duration-200 transition-all shadow-button hover:shadow-button-hover hover:bg-accent-primary tracking-wide font-inter"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-lg text-black group-hover/auth-btn:text-white duration-200 transition-all font-medium">
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        <div className="text-center text-sm text-text-secondary font-inter">
          {type === "signup" ? (
            <Link
              href="/login"
              className="text-white hover:underline font-medium"
            >
              Already have an account?{" "}
              <span className="tracking-wide text-accent-primary font-inter">
                Log In
              </span>
            </Link>
          ) : (
            <Link
              href="/signup"
              className="text-white hover:underline font-medium"
            >
              Don&apos;t have an account?{" "}
              <span className="tracking-wide text-accent-primary font-inter">
                Sign Up
              </span>
            </Link>
          )}
        </div>
      </AuthFormCard>
    </AuthBackground>
  );
}
