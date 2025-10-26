import { Router } from "express";
import {
  getUserController,
  updateUserEmailController,
} from "../controllers/users.controller.js";
import { serverErrorCatcherWrapper } from "../helpers/wrappers.js";
import { bodyValidator, paramsValidator } from "../middleware/validators.js";
import { UserIDSchema, UserEmailSchema } from "../schemas/users.schemas.js";

const usersRouter = Router();

// ! ADD AUTH MIDDLEWARE

// Get User Data
usersRouter.get(
  "/:uid",
  paramsValidator(UserIDSchema),
  serverErrorCatcherWrapper(getUserController)
);

// Update Email
usersRouter.patch(
  "/:uid/email",
  paramsValidator(UserIDSchema),
  bodyValidator(UserEmailSchema),
  serverErrorCatcherWrapper(updateUserEmailController)
);

export default usersRouter;
