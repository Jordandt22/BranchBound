"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Contexts
import { useSupabase } from "@/contexts/Supabase.context";

export default function AuthForm({
  title,
  subTitle,
  description,
  type = "signup",
}) {
  const { supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal via-black to-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325db96' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to home
            </Link>

            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-20 h-20 relative">
                <Image
                  src="/assets/images/logo.png"
                  alt="BranchBound Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              <h2 className="text-xl text-primary font-semibold">{subTitle}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm animate-slide-in">
              {error}
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-800 font-medium py-4 px-6 rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
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
            )}
            <span className="text-lg">
              {isLoading ? "Signing in..." : `Continue with Google`}
            </span>
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            {type === "signup" ? (
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Already have an account?{" "}
                <span className="font-medium">Log In</span>
              </Link>
            ) : (
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Don&apos;t have an account?{" "}
                <span className="font-medium">Sign up</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
