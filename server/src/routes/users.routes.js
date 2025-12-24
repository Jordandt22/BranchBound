import { Router } from "express";
import {
  getUserController,
  updateUserEmailController,
  createProfileController,
} from "../controllers/users.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { bodyValidator, paramsValidator } from "../middleware/validators.js";
import {
  UserIDSchema,
  UserEmailSchema,
  ProfileSchema,
} from "../schemas/users.schemas.js";
import { authUser } from "../middleware/auth.mw.js";

const usersRouter = Router();

// Get User Data
usersRouter.get(
  "/:uid",
  paramsValidator(UserIDSchema),
  authUser,
  serverErrorCatcherWrapper(getUserController)
);

// Create Profile
usersRouter.post(
  "/:uid/profile",
  paramsValidator(UserIDSchema),
  authUser,
  bodyValidator(ProfileSchema),
  serverErrorCatcherWrapper(createProfileController)
);

// Update Email
usersRouter.patch(
  "/:uid/email",
  paramsValidator(UserIDSchema),
  authUser,
  bodyValidator(UserEmailSchema),
  serverErrorCatcherWrapper(updateUserEmailController)
);

// Stories

export default usersRouter;
