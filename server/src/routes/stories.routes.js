import { Router } from "express";
import {
  getFeaturedStoriesController,
  getStoryController,
} from "../controllers/stories.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { StorySlugSchema } from "../schemas/stories.schemas.js";
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
  paramsValidator(StorySlugSchema),
  serverErrorCatcherWrapper(getStoryController)
);

export default storiesRouter;
