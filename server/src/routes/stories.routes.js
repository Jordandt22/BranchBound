import { Router } from "express";
import {
  getFeaturedStoriesController,
  getStoryController,
  generateSceneController,
} from "../controllers/stories.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { authAPIKey } from "../middleware/auth.mw.js";
import { StoryIDSchema, StoryIDAndCharacterIDSchema } from "../schemas/stories.schemas.js";
import { paramsValidator } from "../middleware/validators.js";

const storiesRouter = Router();

// Get Featured Stories
storiesRouter.get(
  "/featured",
  authAPIKey,
  serverErrorCatcherWrapper(getFeaturedStoriesController)
);

// Get Stories
storiesRouter.get(
  "/:storyID",
  authAPIKey,
  paramsValidator(StoryIDSchema),
  serverErrorCatcherWrapper(getStoryController)
);

// Generate Story Scene
storiesRouter.post(
  "/:storyID/character/:characterID/generate/scene",
  authAPIKey,
  paramsValidator(StoryIDAndCharacterIDSchema),
  serverErrorCatcherWrapper(generateSceneController)
);

export default storiesRouter;
