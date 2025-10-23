import { Router } from "express";
import { getFeaturedStoriesController } from "../controllers/stories.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { authAPIKey } from "../middleware/auth.mw.js";

const storiesRouter = Router();

// Get Featured Stories
storiesRouter.get(
  "/featured",
  authAPIKey,
  serverErrorCatcherWrapper(getFeaturedStoriesController)
);

export default storiesRouter;
