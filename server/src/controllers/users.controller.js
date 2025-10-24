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
import {
  deleteAuthUser,
  deleteUser,
  getUserByID,
  updateAuthUserEmail,
} from "../supabase/supabase.functions.js";

const { EMAIL_USED, USER_NOT_FOUND, SUPABASE_ERROR } = errorCodes;

export const getUserController = async (req, res) => {
  const { uid } = req.params;
  const { email } = req.user;

  // Check Cache
  const { key, interval } = getUserKey(uid);
  const cachedData = await getCacheData(key);
  if (cachedData) return res.status(200).json(successHandler(cachedData));

  // Get User Data
  const { data: userData, error: userError } = await getUserByID(uid);
  if (userError) {
    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error getting user.", userError)
      );
  }

  if (userData.length <= 0) {
    return res
      .status(404)
      .json(customErrorHandler(USER_NOT_FOUND, "User not found."));
  }

  // Cache Data
  const data = { user: { uid, email, ...userData[0] } };
  await cacheData(key, interval, data);
  res.status(200).json(successHandler(data));
};

export const deleteUserController = async (req, res) => {
  const { uid } = req.params;
  const { error: deleteError } = await deleteAuthUser(uid);
  if (deleteError)
    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error deleting user.", deleteError)
      );

  // Delete User
  const { error: userDeleteError } = await deleteUser(uid);
  if (userDeleteError)
    return res
      .status(500)
      .json(
        customErrorHandler(
          SUPABASE_ERROR,
          "Error deleting user.",
          userDeleteError
        )
      );

  // Delete Cache
  const { key } = getUserKey(uid);
  await deleteCacheData(key);
  res
    .status(200)
    .json(successHandler({ message: "Sucessfully Deleted User Data!" }));
};

export const updateUserEmailController = async (req, res) => {
  const { uid, email: currentEmail } = req.user;
  const { email } = req.body;

  // Check if Email is Unique
  if (currentEmail === email) {
    return res
      .status(200)
      .json(
        successHandler({ message: "Email is the same as the current email." })
      );
  }

  // Update Auth User
  const { data: updatedData, error: updateError } = await updateAuthUserEmail(
    uid,
    email
  );

  if (updateError) {
    if (updateError.code === "unexpected_failure") {
      return res
        .status(400)
        .json(
          customErrorHandler(
            EMAIL_USED,
            "Unable to update email. This email is already in use.",
            updateError
          )
        );
    }

    return res
      .status(500)
      .json(
        customErrorHandler(
          SUPABASE_ERROR,
          "Error updating user email.",
          updateError
        )
      );
  }

  // Cache Data
  const { key, interval } = getUserKey(uid);
  const data = { user: { uid, email, ...updatedData[0] } };
  await cacheData(key, interval, data);
  res.status(200).json(successHandler(data));
};
