import { Router } from "express";
import { createUserStoryController } from "../controllers/user.stories.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { bodyValidator } from "../middleware/validators.js";
import { UserStorySchema } from "../schemas/users.schemas.js";

const userStoriesRouter = Router();

// Create User Story
userStoriesRouter.post(
  "/",
  bodyValidator(UserStorySchema),
  serverErrorCatcherWrapper(createUserStoryController)
);

export default userStoriesRouter;
