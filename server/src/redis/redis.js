import Redis from "ioredis";
export const redisClient = new Redis({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

// Check Key for Development
export const checkKey = (key) =>
  process.env.NODE_ENV === "development" ? "DEV_" + key : key;

// Check Interval for Development
export const checkInterval = (interval) =>
  process.env.NODE_ENV === "development" ? 60 * 30 : interval;

export const createSearchBusinessKey = (mainKey, searchParamValues) => {
  let udpatedKey = mainKey;

  // Add Search Parameters to Key
  searchParamValues.forEach(({ key, value }) => {
    udpatedKey += `&${key.toUpperCase().replace("_", "-")}:${value}`;
  });

  return udpatedKey;
};

// Cache Actions
export const cacheData = async (key, timeInterval, data) => {
  if (process.env.NODE_ENV === "development")
    console.log(`REDIS: Set Data to Cache [${key}]`);

  await redisClient.set(
    checkKey(key),
    JSON.stringify({ data }),
    "EX",
    checkInterval(timeInterval)
  );
};

export const getCacheData = async (key) => {
  if (process.env.NODE_ENV === "development")
    console.log(`REDIS: Retrieved Data from Cache [${key}]`);
  return JSON.parse(await redisClient.get(checkKey(key)));
};

export const deleteCacheData = async (key) => {
  if (process.env.NODE_ENV === "development")
    console.log(`REDIS: Deleted Data from Cache [${key}]`);
  await redisClient.del(checkKey(key));
};

export const deleteCacheDataByPrefix = async (prefix) => {
  if (process.env.NODE_ENV === "development")
    console.log(`REDIS: Deleted All Data from Cache with [${prefix}]`);

  await redisClient.keys(checkKey(prefix) + "*").then(function (keys) {
    var pipeline = redisClient.pipeline();
    keys.forEach(function (key) {
      pipeline.del(checkKey(key));
    });
    return pipeline.exec();
  });
};

export const flushDBCache = async () => {
  if (process.env.NODE_ENV === "development")
    console.log("REDIS: Flushing Cache");

  await redisClient.flushdb();
};

// REDIS KEYS

// --- Stories ----
export const getFeaturedStoriesKey = () => ({
  key: `STORIES_FEATURED`,
  interval: 60 * 60 * 24,
});

export const getStoryKey = (slug) => ({
  key: `STORIES-SLUG:${slug}`,
  interval: 60 * 60 * 24,
});

export const getCharacterKey = (slug) => ({
  key: `CHARACTER-SLUG:${slug}`,
  interval: 60 * 60 * 24,
});

// --- Users ----
export const getUserKey = (uid) => ({
  key: `USER-UID:${uid}`,
  interval: 60 * 60,
});

// --- User Stories ----
export const getUserStoryKey = (uid, user_story_id) => ({
  key: `USER_STORY?UID:${uid}&USER_STORY_ID:${user_story_id}`,
  interval: 60 * 60 * 24,
});
