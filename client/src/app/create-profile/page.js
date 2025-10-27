"use client";

import React from "react";
import MobileCreateProfileForm from "@/components/auth/CreateProfile/MobileCreateProfileForm";
import DesktopCreateProfileForm from "@/components/auth/CreateProfile/DesktopCreateProfileForm";

export default function CreateProfilePage() {
  // ! CHECK IF USER HAS A PROFILE

  return (
    <div className="min-h-screen bg-black text-white">
      <MobileCreateProfileForm />
      <DesktopCreateProfileForm />
    </div>
  );
}
