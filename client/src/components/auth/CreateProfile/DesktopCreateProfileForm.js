"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProfileSchema } from "./validationSchema";
import { useRouter } from "next/navigation";

// Contexts
import { useGlobal } from "@/contexts/Global.context";
import { useUsersAPI } from "@/contexts/API/UsersAPI.context";
import { useUser } from "@/contexts/User.context";

export default function DesktopCreateProfileForm() {
  const { showLoading, hideLoading } = useGlobal();
  const { createProfile } = useUsersAPI();
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (values) => {
    showLoading("Creating your new profile...");

    try {
      const res = await createProfile(values);
      const data = res.data;

      if (!data.user) {
        hideLoading();
        return router.push("/create-profile");
      }

      // Set User
      setUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      hideLoading();
      return router.push("/create-profile");
    }
  };

  return (
    <div className="hidden md:flex min-h-screen">
      {/* Hero Image Section */}
      <div className="flex-1 bg-gradient-to-br from-teal to-primary flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center px-12 max-w-xl mx-auto space-y-6 relative">
        {/* Header */}
        <div className="flex items-center gap-4 absolute top-6 left-12">
          <Link
            href="/"
            className="text-white hover:text-primary transition-colors"
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
          <h1 className="text-4xl font-bold">Create Profile</h1>
        </div>

        {/* Logo and Description */}
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
            Complete Your Profile
          </h2>
          <p className="text-gray-400 leading-relaxed text-center">
            Let&apos;s set up your profile. Choose a username and confirm your
            age to get started.
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ username: "", age: "" }}
          validationSchema={createProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username (3-20 characters)"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Age Input */}
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-medium">
                  Age
                </label>
                <Field
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age (must be 13+)"
                  min="13"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <ErrorMessage
                  name="age"
                  component="p"
                  className="text-red-400 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 hover:scale-95 duration-200 text-black font-medium py-4 px-6 rounded-lg shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? "Creating..." : "Create Profile"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
