import {
  errorCodes,
  customErrorHandler,
  successHandler,
} from "../../helpers/customErrorHandler.js";
import { cacheData, getUserKey } from "../../redis/redis.js";
import {
  createEmailAndPasswordUser,
  getUserByUsername,
  sendEmailConfirmation,
  signInWithEmailAndPassword,
  sendForgotPasswordEmail,
  createUser,
  getUserByID,
} from "../../supabase/supabase.functions.js";

const {
  EMAIL_USED,
  USER_NOT_FOUND,
  SUPABASE_ERROR,
  USERNAME_USED,
  INVALID_CREDENTIALS,
  EMAIL_NOT_CONFIRMED,
  EMAIL_RATE_LIMIT,
} = errorCodes;

export const signUpController = async (req, res) => {
  const { email, username, age, password } = req.body;

  // Check for if Username Unique
  const { data: usernameCheckData, error: usernameCheckError } =
    await getUserByUsername(username);

  if (usernameCheckError) {
    return res
      .status(500)
      .json(
        customErrorHandler(
          SUPABASE_ERROR,
          "Error checking username.",
          usernameCheckError
        )
      );
  }

  if (usernameCheckData.length > 0) {
    return res
      .status(422)
      .json(
        customErrorHandler(USERNAME_USED, "This username is already taken.")
      );
  }

  const { data: signUpData, error: signUpError } =
    await createEmailAndPasswordUser(email, password);

  // Auth User Creation Error
  if (signUpError || !signUpData) {
    if (signUpError.code === "email_exists") {
      return res
        .status(400)
        .json(
          customErrorHandler(
            EMAIL_USED,
            "An account with this email already exists.",
            signUpError
          )
        );
    }

    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error creating user.", signUpError)
      );
  }

  // Auth User
  const uid = signUpData?.user?.id;

  // Create DB User
  const { data: userData, error: userError } = await createUser(
    uid,
    username,
    age
  );

  if (userError) {
    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error creating user.", userError)
      );
  }

  if (userData.length <= 0) {
    return res
      .status(404)
      .json(customErrorHandler(USER_NOT_FOUND, "User not found."));
  }

  // Cache Data
  const data = { user: { email, ...userData[0] } };
  const { key, interval } = getUserKey(uid);
  await cacheData(key, interval, data);
  res.status(200).json(successHandler(data));
};

export const signInController = async (req, res) => {
  const { email, password } = req.body;
  const { data: signInData, error: signInError } =
    await signInWithEmailAndPassword(email, password);

  if (signInError) {
    if (signInError.code === "invalid_credentials") {
      return res
        .status(401)
        .json(
          customErrorHandler(
            INVALID_CREDENTIALS,
            "This is not a valid email and password combination.",
            signInError
          )
        );
    } else if (signInError.code === "email_not_confirmed") {
      return res
        .status(401)
        .json(
          customErrorHandler(
            EMAIL_NOT_CONFIRMED,
            "Please verify your email before signing in.",
            signInError
          )
        );
    }

    return res
      .status(500)
      .json(
        customErrorHandler(
          SUPABASE_ERROR,
          "There was an error signing you in.",
          signInError
        )
      );
  }

  // User Data
  const {
    user: { uid },
    session: { access_token: accessToken, refresh_token: refreshToken },
  } = signInData;

  // Getting User Data
  const { data: userData, error: userError } = await getUserByID(uid);
  if (userError) {
    return res
      .status(500)
      .json(
        customErrorHandler(SUPABASE_ERROR, "Error getting user.", userError)
      );
  }

  if (userData.length <= 0) {
    return res
      .status(404)
      .json(customErrorHandler(USER_NOT_FOUND, "User not found."));
  }

  // Cache Data
  const { key, interval } = getUserKey(uid);
  const data = {
    user: { uid, email, ...userData[0] },
  };
  await cacheData(key, interval, data);
  res.status(200).json(successHandler({ ...data, accessToken, refreshToken }));
};

export const sendEmailVerificationController = async (req, res) => {
  const { email } = req.body;
  const { error } = await sendEmailConfirmation(email);

  if (error) {
    if (error.code === "over_email_send_rate_limit") {
      return res
        .status(429)
        .json(
          customErrorHandler(
            EMAIL_RATE_LIMIT,
            "Please wait 1 minute before trying again.",
            error
          )
        );
    }

    return res
      .status(500)
      .json(
        customErrorHandler(
          SUPABASE_ERROR,
          "Error sending email verification.",
          error
        )
      );
  }

  res.status(200).json(successHandler({ message: "Email verification sent." }));
};

export const sendForgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const { error } = await sendForgotPasswordEmail(email);

  if (error) {
    if (error.code === "over_email_send_rate_limit") {
      return res
        .status(429)
        .json(
          customErrorHandler(
            EMAIL_RATE_LIMIT,
            "Please wait 1 minute before trying again.",
            error
          )
        );
    }

    return res
      .status(500)
      .json(
        customErrorHandler(
          SUPABASE_ERROR,
          "Error sending forgot password email.",
          error
        )
      );
  }

  res
    .status(200)
    .json(successHandler({ message: "Forgot password email sent." }));
};
