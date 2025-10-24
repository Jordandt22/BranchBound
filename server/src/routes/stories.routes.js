import { Router } from "express";
import {
  getFeaturedStoriesController,
  getStoryController,
} from "../controllers/stories.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { StoryIDSchema } from "../schemas/stories.schemas.js";
import { paramsValidator } from "../middleware/validators.js";

const storiesRouter = Router();

// Get Featured Stories
storiesRouter.get(
  "/featured",
  serverErrorCatcherWrapper(getFeaturedStoriesController)
);

// Get Stories
storiesRouter.get(
  "/:storyID",
  paramsValidator(StoryIDSchema),
  serverErrorCatcherWrapper(getStoryController)
);

export default storiesRouter;
