import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ONE_TO_ONE } from "./constants/aspectRatios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStoryImageURL(storySlug, aspectRatio = ONE_TO_ONE) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/stories/${storySlug}/covers/${aspectRatio}.webp`;
}

export function getCharacterImageURL(
  storySlug,
  characterSlug,
  aspectRatio = ONE_TO_ONE
) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/stories/${storySlug}/characters/${characterSlug}/${aspectRatio}.webp`;
}

const unauthenticatedBlacklist = [
  "/",
  "/login",
  "/signup",
  "/create-profile",
  "/auth/callback",
];

export function setRedirectURL(pathname) {
  if (unauthenticatedBlacklist.includes(pathname)) return;

  localStorage.setItem("redirect", pathname);
}

export function getRedirectURL() {
  const redirect = localStorage.getItem("redirect");
  if (!redirect) return "/discover";

  if (unauthenticatedBlacklist.includes(redirect)) return "/discover";

  return redirect;
}

export function removeRedirectURL() {
  localStorage.removeItem("redirect");
}
