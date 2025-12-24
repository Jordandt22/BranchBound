import {
  errorCodes,
  customErrorHandler,
  successHandler,
} from "../helpers/customErrorHandler.js";
import { cacheData, getUserStoryKey, getCacheData } from "../redis/redis.js";
import {
  createUserStory,
  getUserStoryByID,
} from "../supabase/supabase.functions.js";

const { SUPABASE_ERROR, USER_STORY_ERROR } = errorCodes;

export const createUserStoryController = async (req, res) => {
  const { uid } = req.user;
  const { story_id, story_settings } = req.body;

  // Create User Story
  const { data, error } = await createUserStory(
    req.user,
    story_id,
    story_settings
  );
  if (error) {
    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error creating user story.", error)
      );
  }

  // Check Data
  if (!data) {
    return res
      .status(500)
      .json(
        customErrorHandler(USER_STORY_ERROR, "Unable to create user story.")
      );
  }

  // Cache Data
  const userStoryData = { ...data, participants: [] };
  const { key, interval } = getUserStoryKey(uid, userStoryData.user_story_id);
  await cacheData(key, interval, userStoryData);
  return res.status(200).json(successHandler(userStoryData));
};

export const getUserStoryController = async (req, res) => {
  const { uid } = req.user;
  const { user_story_id } = req.params;

  // Check Cache
  const { key, interval } = getUserStoryKey(uid, user_story_id);
  const cachedData = await getCacheData(key);
  if (cachedData) {
    return res.status(200).json(successHandler(cachedData.data));
  }

  // Get User Story Data w/ participants
  const { data, error } = await getUserStoryByID(req.user, user_story_id);
  if (error) {
    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error getting user story.", error)
      );
  }

  // Cache User Story Data
  await cacheData(key, interval, data);
  res.status(200).json(successHandler(data));
};
