import {
  errorCodes,
  customErrorHandler,
} from "../helpers/customErrorHandler.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";

export const authAPIKey = serverErrorCatcherWrapper(async (req, res, next) => {
  const apiKey = req.headers?.authorization?.replace("Bearer ", "");
  if (!apiKey || apiKey === "null")
    return res
      .status(422)
      .json(
        customErrorHandler(errorCodes.NO_API_KEY, "MUST provide credentials.")
      );

  if (apiKey !== process.env.INTERNAL_API_KEY)
    return res
      .status(401)
      .json(customErrorHandler(errorCodes.INVALID_API_KEY, "Invalid API key."));

  return next();
});
