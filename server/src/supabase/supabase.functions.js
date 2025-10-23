import { supabase } from "./supabase.js";

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
