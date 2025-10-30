import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStoryImageURL(storySlug) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/stories/${storySlug}/covers/cover.webp`;
}

export function getCharacterImageURL(storySlug, characterSlug) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/stories/${storySlug}/characters/${characterSlug}.webp`;
}
