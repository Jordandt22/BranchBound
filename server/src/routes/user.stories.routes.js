import { Router } from "express";
import { createUserStoryController, getUserStoryController } from "../controllers/user.stories.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { bodyValidator, paramsValidator } from "../middleware/validators.js";
import {
  UserStorySchema,
  UserStoryIDSchema,
} from "../schemas/users.schemas.js";

const userStoriesRouter = Router();

// Create User Story
userStoriesRouter.post(
  "/",
  bodyValidator(UserStorySchema),
  serverErrorCatcherWrapper(createUserStoryController)
);

// Get User Story
userStoriesRouter.get(
  "/:user_story_id",
  paramsValidator(UserStoryIDSchema),
  serverErrorCatcherWrapper(getUserStoryController)
);

export default userStoriesRouter;
