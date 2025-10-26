"use client";

import Link from "next/link";
import Image from "next/image";

// Contexts
import { useSupabase } from "@/contexts/Supabase.context";

export default function DesktopAuthForm(props) {
  const { supabase } = useSupabase();
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="hidden md:flex min-h-screen">
      {/* Hero Image Section */}
      <div className="flex-1 bg-gradient-to-br from-[#0f766e] to-[#25db96] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center px-12 max-w-xl mx-auto space-y-6 relative">
        {/* Header */}
        <div className="flex items-center gap-4 absolute top-6 left-12">
          <Link
            href="/"
            className="text-white hover:text-[#25db96] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          </Link>
          <h1 className="text-4xl font-bold">{props.title}</h1>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className="flex justify-center items-center w-full mb-8 h-48 relative">
            <Image
              src="/assets/images/logo.png"
              alt="BranchBound Logo"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl text-primary font-semibold text-center">
            {props.subTitle}
          </h2>
          <p className="text-gray-400 leading-relaxed text-center">
            {props.description}
          </p>
        </div>

        {/* Google Login Button */}
        <button className="w-full bg-white hover:bg-gray-200 hover:scale-95 duration-200 text-gray-800 font-medium py-4 px-6 rounded-lg flex items-center justify-center gap-3 shadow-lg cursor-pointer">
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
          <span className="text-lg" onClick={handleGoogleLogin}>
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}
