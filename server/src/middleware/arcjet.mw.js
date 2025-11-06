import arcjet from "@arcjet/node";
import { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import {
  errorCodes,
  customErrorHandler,
} from "../helpers/customErrorHandler.js";
import { getWebURL } from "../utils/urlGenerator.js";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: process.env.NODE_ENV === "development" ? ["POSTMAN"] : [],
      trusted: [getWebURL()],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 15, // Refill tokens per interval
      interval: 30, // Seconds Interval
      capacity: 150, // Bucket tokens capacity
    }),
  ],
});

export const arcjetMiddleware = async (req, res, next) => {
  const decision = await aj.protect(req, { requested: 1 });
  if (process.env.NODE_ENV === "development")
    console.log(
      `Arcjet Decision: ${decision.conclusion} - [${decision.reason.type}]`
    );

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return res
        .status(429)
        .json(
          customErrorHandler(
            errorCodes.TOO_MANY_REQUESTS,
            "Too many requests have been sent. Please try again later."
          )
        );
    } else if (decision.reason.isBot()) {
      // Allow Front-end with Auth Key
      const clientName = req.headers["x-client-name"];
      const authKey = req.headers["x-auth-key"];
      if (
        clientName === process.env.CLIENT_NAME &&
        authKey === process.env.AUTH_KEY
      ) {
        console.log("Allowing Frontend with Auth Key:", clientName);
        return next();
      }

      return res
        .status(403)
        .json(
          customErrorHandler(
            errorCodes.BOTS_DETECTED,
            "Bots Detected. Please refrain from using bots to access our API."
          )
        );
    } else {
      return res
        .status(403)
        .json(
          customErrorHandler(
            errorCodes.ACCESS_DENIED,
            "Your access has been denied."
          )
        );
    }
  } else if (decision.results.some(isSpoofedBot)) {
    return res
      .status(403)
      .json(
        customErrorHandler(
          errorCodes.ACCESS_DENIED,
          "Your access has been denied."
        )
      );
  }

  next();
};
