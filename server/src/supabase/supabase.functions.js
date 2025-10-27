import { supabase, adminAuthClient } from "./supabase.js";
import { getWebURL } from "../utils/urlGenerator.js";

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

// * --------- Auth ---------
export const createEmailAndPasswordUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getWebURL()}/verified`,
    },
  });

  return { data, error };
};

export const signInWithEmailAndPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const getAuthUserByAccessToken = async (accessToken) => {
  const { data, error } = await supabase.auth.getUser(accessToken);

  return { data, error };
};

export const deleteAuthUser = async (uid) => {
  const { data, error } = await adminAuthClient.deleteUser(uid);
  return { data, error };
};

export const updateAuthUserEmail = async (uid, email) => {
  const { data, error } = await adminAuthClient.updateUserById(uid, {
    email,
  });

  return { data, error };
};

export const sendEmailConfirmation = async (email) => {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
    redirectTo: `${getWebURL()}/verified`,
  });
  return { data, error };
};

export const sendForgotPasswordEmail = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getWebURL()}/reset`,
  });
  return { data, error };
};

// * --------- Database ---------

// ---- Stories ----
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

// ---- Users ----
export const createUser = async (uid, username, age) => {
  const { data, error } = await supabase
    .from("users")
    .insert({
      uid,
      username,
      age,
    })
    .select("*");

  return { data, error };
};

export const getUserByUsername = async (username) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  return { data, error };
};

export const getUserByID = async (uid) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", uid);

  return { data, error };
};

export const deleteUser = async (uid) => {
  const { data, error } = await supabase
    .from("users")
    .delete("*")
    .eq("uid", uid);

  return { data, error };
};
