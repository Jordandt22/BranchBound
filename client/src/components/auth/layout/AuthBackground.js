import React from "react";
import Image from "next/image";

function AuthBackground({ children }) {
  return (
    <div className="min-h-screen relative bg-base-bg flex items-end md:items-center md:justify-center md:p-4 overflow-hidden">
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-surface via-base-bg to-base-bg"></div>

      {/* Subtle Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(20,24,28,0.6)] to-[rgba(14,17,20,0.9)]"></div>

      {/* Glow Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,219,150,0.2),transparent_70%)]"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325db96' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      {/* Logo Header */}
      <div className="absolute left-4 right-4 md:left-6 top-6 md:top-6 z-10">
        <div className="w-full md:w-fit flex items-center justify-center md:justify-start gap-3 bg-surface text-text-primary p-3 pr-8 rounded-full shadow-logo backdrop-blur-sm">
          <Image
            src="/assets/images/logo.png"
            alt="BranchBound Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <h1 className="text-lg font-bold tracking-wide font-merriweather">
            BranchBound
          </h1>
        </div>
      </div>

      {children}
    </div>
  );
}

export default AuthBackground;
