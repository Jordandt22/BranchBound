import {
  errorCodes,
  customErrorHandler,
  successHandler,
} from "../helpers/customErrorHandler.js";
import {
  cacheData,
  getUserKey,
  getCacheData,
  deleteCacheData,
} from "../redis/redis.js";
import { createUserStory } from "../supabase/supabase.functions.js";

const { SUPABASE_ERROR, USER_STORY_ERROR } = errorCodes;

export const createUserStoryController = async (req, res) => {
  const { id: uid } = req.user;
  const { story_id, story_settings } = req.body;

  // Create User Story
  const { data, error } = await createUserStory(uid, story_id, story_settings);
  if (error) {
    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error creating user story.", error)
      );
  }

  // Check Data
  if (!data || data?.length === 0) {
    return res
      .status(500)
      .json(
        customErrorHandler(USER_STORY_ERROR, "Unable to create user story.")
      );
  }

  return res.status(200).json(successHandler(data[0]));
};
