import { getUserKey, getCacheData } from "../redis/redis.js";
import { getUserByID } from "../supabase/supabase.functions.js";
import { cacheData } from "../redis/redis.js";
import { errorCodes } from "./customErrorHandler.js";

const { SUPABASE_ERROR, USER_NOT_FOUND } = errorCodes;

export const getUserData = async (user) => {
  const { uid, email } = user;

  // Check Cache
  const { key, interval } = getUserKey(uid);
  const cachedData = await getCacheData(key);
  if (cachedData) return { data: cachedData, error: null };

  // Get User Data
  const { data: userData, error: userError } = await getUserByID(user);
  if (userError) {
    return {
      data: null,
      error: {
        status: 500,
        code: SUPABASE_ERROR,
        message: "Error getting user.",
      },
    };
  }

  if (!userData) {
    return {
      data: null,
      error: { status: 404, code: USER_NOT_FOUND, message: "User not found." },
    };
  }

  // Cache Data
  const data = { user: { uid, email, ...userData } };
  await cacheData(key, interval, data);
  return { data, error: null };
};
