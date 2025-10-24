import {
  errorCodes,
  customErrorHandler,
  successHandler,
} from "../helpers/customErrorHandler.js";
import {
  getFeaturedStories,
  getStoryByID,
} from "../supabase/supabase.functions.js";
import { getFeaturedStoriesKey, getStoryKey } from "../redis/redis.js";
import { getCacheData, cacheData } from "../redis/redis.js";

// Get Featured Stories
export const getFeaturedStoriesController = async (req, res) => {
  // Get Data from Cache
  const { key, interval } = getFeaturedStoriesKey();
  const cachedData = await getCacheData(key);
  if (cachedData) {
    return res.status(200).json(successHandler(cachedData.data));
  }

  // Get Featured Stories
  const { data, error } = await getFeaturedStories();
  if (error) {
    return res
      .status(500)
      .json(
        customErrorHandler(
          errorCodes.SUPABASE_ERROR,
          "There was an error fetching featured stories.",
          error
        )
      );
  }

  // Stories Not Found
  if (!data || data?.length === 0)
    return res
      .status(404)
      .json(
        customErrorHandler(errorCodes.STORIES_NOT_FOUND, "Stories not found.")
      );

  // Cache Data
  await cacheData(key, interval, data);
  return res.status(200).json(successHandler(data));
};

// Get Story
export const getStoryController = async (req, res) => {
  const { storyID } = req.params;

  // Get Data from Cache
  const { key, interval } = getStoryKey(storyID);
  const cachedData = await getCacheData(key);
  if (cachedData) {
    return res.status(200).json(successHandler(cachedData.data));
  }

  // Get DB Data
  const { data, error } = await getStoryByID(storyID);
  if (error) {
    return res
      .status(500)
      .json(
        customErrorHandler(
          errorCodes.SUPABASE_ERROR,
          "There was an error fetching the story.",
          error
        )
      );
  }

  // Story Not Found
  if (!data || data?.length === 0)
    return res
      .status(404)
      .json(customErrorHandler(errorCodes.STORY_NOT_FOUND, "Story not found."));

  // Cache Data
  const storyData = data[0];
  await cacheData(key, interval, storyData);
  return res.status(200).json(successHandler(storyData));
};

// Generate Story Scene
export const generateSceneController = async (req, res) => {
  const { storyID, characterID } = req.params;
  const {} = req.body;

  // !FUTURE: CHECK IF USER HAS ENOUGH TOKENS

  // !FUTURE: CHECK IF USER HAS ACCESS TO STORY

  // !FUTURE: GET USER INFO FOR SCENE (Total Scenes, Scene Index)
  const sceneInfo = {
    sceneIndex: 0,
    totalScenes: 0,
    previousSceneText: "",
    userPreviousChoices: "",
    previousChoice: {
      category: "",
      text: "",
      risk: "",
    },
    storySummary: "",
  };

  // Get Story Info
  const { data: storyData, error: storyError } = await getStoryByID(storyID);
  if (storyError) {
    return res
      .status(500)
      .json(
        customErrorHandler(
          errorCodes.SUPABASE_ERROR,
          "There was an error fetching the story.",
          storyError
        )
      );
  }

  // Get Character Info

  // ! CONTINUE LATER
};
