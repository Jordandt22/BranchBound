import { Router } from "express";
import {
  signUpController,
  signInController,
  sendEmailVerificationController,
  sendForgotPasswordController,
} from "../../controllers/auth/internal.controller.js";
import { serverErrorCatcherWrapper } from "../../helpers/wrappers.js";
import {
  SignUpSchema,
  SignInSchema,
  UserEmailSchema,
} from "../../schemas/users.schemas.js";
import { bodyValidator } from "../../middleware/validators.js";

const internalAuthRouter = Router();

// Create User
internalAuthRouter.post(
  "/signup",
  bodyValidator(SignUpSchema),
  serverErrorCatcherWrapper(signUpController)
);

// Sign In
internalAuthRouter.post(
  "/signin",
  bodyValidator(SignInSchema),
  serverErrorCatcherWrapper(signInController)
);

// Send Email Verification
internalAuthRouter.post(
  "/email-verification",
  bodyValidator(UserEmailSchema),
  serverErrorCatcherWrapper(sendEmailVerificationController)
);

// Send Forgot Password Email
internalAuthRouter.post(
  "/forgot-password",
  bodyValidator(UserEmailSchema),
  serverErrorCatcherWrapper(sendForgotPasswordController)
);

export default internalAuthRouter;
