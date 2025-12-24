import { Router } from "express";
import { googleAuthController } from "../../controllers/auth/external.controller.js";
import { serverErrorCatcherWrapper } from "../../helpers/wrappers.js";

const externalAuthRouter = Router();

// Google
externalAuthRouter.post(
  "/google",
  serverErrorCatcherWrapper(googleAuthController)
);

export default externalAuthRouter;
