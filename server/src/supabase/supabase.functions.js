import { supabase } from "./supabase.js";

const fullStorySelect =
  "*, characters:story_characters!inner(character_id, characters(*)), genres:story_genres!inner(genre_id, genres(*))";

// Formatters
const formatFullStory = (stories) => {
  return stories.map((story) => {
    return {
      ...story,
      characters: story.characters.map((character) => character.characters),
      genres: story.genres.map((genre) => genre.genres),
    };
  });
};

// ---- Database ----

// Featured Stories
export const getFeaturedStories = async () => {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(10);

  if (data) {
    return { data, error };
  }

  return { data: null, error };
};

// Get Story by ID
export const getStoryByID = async (storyID) => {
  const { data, error } = await supabase
    .from("stories")
    .select(fullStorySelect)
    .eq("story_id", storyID);
  if (data) {
    return { data: formatFullStory(data), error };
  }

  return { data: null, error };
};
