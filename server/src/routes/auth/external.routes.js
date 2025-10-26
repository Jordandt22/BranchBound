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

const externalAuthRouter = Router();

// Google
externalAuthRouter.post("/google", serverErrorCatcherWrapper(googleAuthController));

export default externalAuthRouter;  
