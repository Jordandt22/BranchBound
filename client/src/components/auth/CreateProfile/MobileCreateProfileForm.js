"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProfileSchema } from "./validationSchema";

export default function MobileCreateProfileForm() {
  const handleSubmit = async (values) => {
    // Handle form submission
    console.log("Form submitted:", values);
    // Add your API call here
  };

  return (
    <div className="flex flex-col md:hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
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
          <h1 className="text-3xl font-bold">Create Profile</h1>
        </div>
        <div className="w-12 h-12 relative">
          <Image
            src="/assets/images/logo.png"
            alt="BranchBound Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Hero Image Placeholder */}
      <div className="w-full h-64 bg-gradient-to-br from-teal to-primary flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Description */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Complete Your Profile</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
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
                  placeholder="Choose a username"
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
                  placeholder="Enter your age"
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
                className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-4 px-6 rounded-lg transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
