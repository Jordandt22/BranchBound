import { Router } from "express";
import {
  getFeaturedStoriesController,
  getStoryController,
  getCharacterController,
} from "../controllers/stories.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { SlugParamSchema } from "../schemas/stories.schemas.js";
import { paramsValidator } from "../middleware/validators.js";

const storiesRouter = Router();

// Get Featured Stories
storiesRouter.get(
  "/featured",
  serverErrorCatcherWrapper(getFeaturedStoriesController)
);

// Get Story
storiesRouter.get(
  "/:slug",
  paramsValidator(SlugParamSchema),
  serverErrorCatcherWrapper(getStoryController)
);

// Get Character
storiesRouter.get(
  "/character/:slug",
  paramsValidator(SlugParamSchema),
  serverErrorCatcherWrapper(getCharacterController)
);

export default storiesRouter;
