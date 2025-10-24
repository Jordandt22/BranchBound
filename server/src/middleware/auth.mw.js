import {
  errorCodes,
  customErrorHandler,
} from "../helpers/customErrorHandler.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
const { NO_API_KEY, INVALID_API_KEY } = errorCodes;

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
