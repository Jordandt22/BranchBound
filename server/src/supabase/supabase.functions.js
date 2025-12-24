import {
  getSupabaseUserClient,
  getSupabaseAuthClient,
  getSupabasePublicClient,
} from "./supabase.js";
import { getWebURL } from "../lib/utils/urlGenerator.js";
import { STORY_LENGTH_TYPES } from "../lib/enums/user.stories.enums.js";

const fullStorySelect =
  "*, characters:story_characters!inner(character_id, characters(*)), genres:story_genres!inner(genre_id, genres(*))";

// Formatters
const formatFullStory = (story) => {
  return {
    ...story,
    characters: story.characters.map((character) => character.characters),
    genres: story.genres.map((genre) => genre.genres),
  };
};

// * --------- Auth ---------
export const createEmailAndPasswordUser = async (email, password) => {
  const { data, error } = await getSupabaseAuthClient().auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getWebURL()}/verified`,
    },
  });

  return { data, error };
};

export const signInWithEmailAndPassword = async (email, password) => {
  const { data, error } = await getSupabaseAuthClient().auth.signInWithPassword(
    {
      email,
      password,
    }
  );

  return { data, error };
};

export const getAuthUserByAccessToken = async (accessToken) => {
  const { data, error } = await getSupabaseAuthClient().auth.getUser(
    accessToken
  );

  return { data, error };
};

export const deleteAuthUser = async (uid) => {
  const { data, error } = await getSupabaseAuthClient().auth.admin.deleteUser(
    uid
  );
  return { data, error };
};

export const updateAuthUserEmail = async (uid, email) => {
  const { data, error } =
    await getSupabaseAuthClient().auth.admin.updateUserById(uid, {
      email,
    });

  return { data, error };
};

export const sendEmailConfirmation = async (email) => {
  const { data, error } = await getSupabaseAuthClient().auth.resend({
    type: "signup",
    email,
    redirectTo: `${getWebURL()}/verified`,
  });
  return { data, error };
};

export const sendForgotPasswordEmail = async (email) => {
  const { data, error } =
    await getSupabaseAuthClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${getWebURL()}/reset`,
    });
  return { data, error };
};

// * --------- Database ---------

// ---- Stories ----
export const getFeaturedStories = async () => {
  const { data, error } = await getSupabasePublicClient()
    .from("stories")
    .select("*")
    .eq("is_featured", true)
    .order("updated_at", { ascending: false })
    .limit(5);

  if (data) {
    return { data, error };
  }

  return { data: null, error };
};

export const getStoryBySlug = async (slug) => {
  const { data, error } = await getSupabasePublicClient()
    .from("stories")
    .select(fullStorySelect)
    .eq("slug", slug)
    .single();

  if (data) {
    return { data: formatFullStory(data), error };
  }

  return { data: null, error };
};

export const getCharacterBySlug = async (slug) => {
  const { data, error } = await getSupabasePublicClient()
    .from("characters")
    .select(
      "*, default_story:stories!characters_default_story_id_fkey(slug, title, short_desc, story_id, is_locked), character_group:character_groups!characters_character_group_id_fkey(*, characters(*))"
    )
    .eq("slug", slug)
    .single();

  return { data, error };
};

// ---- Users ----
export const createUser = async (uid, username, age) => {
  const { data, error } = await getSupabaseAuthClient()
    .from("users")
    .insert({
      uid,
      username,
      age,
    })
    .select("*")
    .single();

  return { data, error };
};

export const getUserByUsername = async (username) => {
  const { data, error } = await getSupabaseAuthClient()
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  return { data, error };
};

export const getUserByID = async ({ uid, access_token }) => {
  const { data, error } = await getSupabaseUserClient(access_token)
    .from("users")
    .select("*")
    .eq("uid", uid)
    .single();

  return { data, error };
};

export const deleteUser = async (uid) => {
  const { data, error } = await getSupabaseAuthClient()
    .from("users")
    .delete("*")
    .eq("uid", uid)
    .single();

  return { data, error };
};

// ---- User Stories ----
export const createUserStory = async (
  { uid, access_token },
  story_id,
  story_settings
) => {
  const { story_length_type } = story_settings;
  let total_scenes = STORY_LENGTH_TYPES.MEDIUM.total_scenes;
  switch (story_length_type) {
    case STORY_LENGTH_TYPES.SHORT.value:
      total_scenes = STORY_LENGTH_TYPES.SHORT.total_scenes;
      break;
    case STORY_LENGTH_TYPES.MEDIUM.value:
      total_scenes = STORY_LENGTH_TYPES.MEDIUM.total_scenes;
      break;
    case STORY_LENGTH_TYPES.LONG.value:
      total_scenes = STORY_LENGTH_TYPES.LONG.total_scenes;
      break;
    case STORY_LENGTH_TYPES.UNLIMITED.value:
      total_scenes = STORY_LENGTH_TYPES.UNLIMITED.total_scenes;
      break;

    default:
      total_scenes = STORY_LENGTH_TYPES.MEDIUM.total_scenes;
      break;
  }

  const { data, error } = await getSupabaseUserClient(access_token)
    .from("user_stories")
    .insert({
      uid,
      story_id,
      ...story_settings,
      total_scenes,
    })
    .select("*")
    .single();

  return { data, error };
};

export const getUserStoryByID = async (
  { uid, access_token },
  user_story_id
) => {
  const { data, error } = await getSupabaseUserClient(access_token)
    .from("user_stories")
    .select("*,  participants:user_story_participants (*)")
    .eq("uid", uid)
    .eq("user_story_id", user_story_id)
    .single();

  return { data, error };
};
