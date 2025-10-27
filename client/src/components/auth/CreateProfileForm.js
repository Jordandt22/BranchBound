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

// Components
import AuthBackground from "./AuthBackground";
import AuthFormCard from "./AuthFormCard";

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
    <AuthBackground>
      {/* Main Card */}
      <AuthFormCard
        title="Complete Your Profile"
        description="Let's set up your profile. Choose a username and confirm your age to get started."
      >
        {/* Error Message */}
        {error && (
          <div className="bg-error/10 border border-error/30 text-error px-4 py-3 rounded-xl text-sm animate-slide-in shadow-error">
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
            <Form className="space-y-6 mt-8">
              {/* Username Input */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-text-primary font-oswald"
                >
                  Username*
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username (3-20 characters)"
                  className={`w-full text-sm bg-surface-hover border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 font-inter ${
                    errors.username && touched.username
                      ? "border-error"
                      : "border-accent-subtle"
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-error text-sm animate-slide-in font-inter"
                />
              </div>

              {/* Age Input */}
              <div className="space-y-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-text-primary font-oswald"
                >
                  Age*
                </label>
                <Field
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age (must be 13+)"
                  min="13"
                  className={`w-full text-sm bg-surface-hover border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 font-inter ${
                    errors.age && touched.age
                      ? "border-error"
                      : "border-accent-subtle"
                  }`}
                  autoComplete="off"
                />
                <ErrorMessage
                  name="age"
                  component="p"
                  className="text-error text-sm animate-slide-in font-inter"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent-primary to-accent-hover hover:from-accent-hover hover:to-accent-primary disabled:from-accent-primary/50 disabled:to-accent-hover/50 font-semibold py-4 px-6 rounded-2xl shadow-button hover:shadow-button-hover transition-all duration-200 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed tracking-wide cursor-pointer mt-4 font-oswald text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-base-bg/30 border-t-base-bg rounded-full animate-spin"></div>
                    Creating profile...
                  </div>
                ) : (
                  "Create Profile"
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="text-center text-sm text-text-secondary mt-8 leading-relaxed font-inter">
          <p>
            By creating a profile, you agree to our{" "}
            <Link
              href="/tos"
              className="text-accent-primary hover:text-accent-hover transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-accent-primary hover:text-accent-hover transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </AuthFormCard>
    </AuthBackground>
  );
}
