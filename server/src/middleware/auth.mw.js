import {
  errorCodes,
  customErrorHandler,
} from "../helpers/customErrorHandler.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { getAuthUserByAccessToken } from "../supabase/supabase.functions.js";
const { NO_API_KEY, INVALID_API_KEY, NO_ACCESS_TOKEN, INVALID_ACCESS_TOKEN } =
  errorCodes;

export const authAPIKey = (API_KEY) =>
  serverErrorCatcherWrapper(async (req, res, next) => {
    const apiKey = req.headers?.authorization?.replace("Bearer ", "");
    if (!apiKey || apiKey === "null")
      return res
        .status(422)
        .json(customErrorHandler(NO_API_KEY, "MUST provide credentials."));

    if (apiKey !== API_KEY)
      return res
        .status(401)
        .json(customErrorHandler(INVALID_API_KEY, "Invalid API key."));

    return next();
  });

export const authUser = async (req, res, next) => {
  const accessToken = req.headers?.authorization?.replace("Bearer ", "");
  if (!accessToken || accessToken === "null")
    return res
      .status(422)
      .json(customErrorHandler(NO_ACCESS_TOKEN, "MUST provide access token."));

  const { data, error } = await getAuthUserByAccessToken(accessToken);
  if (error)
    return res
      .status(401)
      .json(customErrorHandler(INVALID_ACCESS_TOKEN, "Invalid access token."));

  req.user = data.user;
  return next();
};
