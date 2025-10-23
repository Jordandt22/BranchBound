import {
  errorCodes,
  customErrorHandler,
  successHandler,
} from "../helpers/customErrorHandler.js";
import { getFeaturedStories } from "../supabase/supabase.functions.js";
import { getFeaturedStoriesKey } from "../redis/redis.js";
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

  // Cache Data
  await cacheData(key, interval, data);
  return res.status(200).json(successHandler(data));
};
