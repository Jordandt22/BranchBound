"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProfileSchema } from "@/lib/schemas/user.schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Contexts
import { useGlobal } from "@/contexts/Global.context";
import { useUsersAPI } from "@/contexts/API/UsersAPI.context";
import { useUser } from "@/contexts/User.context";

export default function CreateProfileForm() {
  const { showLoading, hideLoading } = useGlobal();
  const { createProfile } = useUsersAPI();
  const { updateUser } = useUser();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    showLoading("Creating your profile...");

    try {
      const res = await createProfile(values);
      const data = res.data;

      if (!data.user) {
        setError("Failed to create profile. Please try again.");
        hideLoading();
        setSubmitting(false);
        return;
      }

      // Set User
      updateUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Failed to create profile. Please try again."
      );
      hideLoading();
      setSubmitting(false);
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
              <h1 className="text-3xl font-bold text-foreground">
                Complete Your Profile
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Let&apos;s set up your profile. Choose a username and confirm
                your age to get started.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm animate-slide-in">
              {error}
            </div>
          )}

          {/* Form */}
          <Formik
            initialValues={{ username: "", age: "" }}
            validationSchema={createProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                {/* Username Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-foreground"
                  >
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username (3-20 characters)"
                    className={`w-full bg-input border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${
                      errors.username && touched.username
                        ? "border-destructive"
                        : "border-border"
                    }`}
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-destructive text-sm animate-slide-in"
                  />
                </div>

                {/* Age Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-foreground"
                  >
                    Age
                  </label>
                  <Field
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age (must be 13+)"
                    min="13"
                    className={`w-full bg-input border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 ${
                      errors.age && touched.age
                        ? "border-destructive"
                        : "border-border"
                    }`}
                  />
                  <ErrorMessage
                    name="age"
                    component="p"
                    className="text-destructive text-sm animate-slide-in"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-medium py-4 px-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Creating Profile...
                    </div>
                  ) : (
                    "Create Profile"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              By creating a profile, you agree to our{" "}
              <Link
                href="/tos"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
