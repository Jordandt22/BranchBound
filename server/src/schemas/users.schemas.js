import * as Yup from "yup";

// ---- Params Request ----

export const UserIDSchema = Yup.object({
  uid: Yup.string().trim().uuid().required("Please provide a user ID."),
});

// ---- Body Request ----

// Sign Up Schema
export const SignUpSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Please enter a username.")
    .max(50, "Username exceeds the max character limit (50).")
    .required("Please enter a username."),
  email: Yup.string()
    .trim()
    .min(1, "Please enter a valid email.")
    .max(50, "Email exceeds the character limit (50).")
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  age: Yup.number()
    .min(13, "You must be atleast 13 years old.")
    .max(150, "Age exceeds the max age limit (150).")
    .required("Please enter your age."),
  password: Yup.string()
    .trim()
    .min(8, "Password must be atleast 8 characters.")
    .max(16, "Password exceeds the character limit (16).")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must contain atleast 1 upper and lower case letter, 1 number, and 1 special symbol."
    )
    .required("Please create a password."),
});

// Sign In Schema
export const SignInSchema = Yup.object({
  email: Yup.string()
    .trim()
    .min(1, "Please enter a valid email.")
    .max(50, "Email exceeds the character limit (50).")
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  password: Yup.string()
    .trim()
    .min(8, "Password must be atleast 8 characters.")
    .max(16, "Password exceeds the character limit (16).")
    .required("Please enter your password."),
});

// User Email Schema
export const UserEmailSchema = Yup.object({
  email: Yup.string()
    .trim()
    .min(1, "Please enter a valid email.")
    .max(50, "Email exceeds the character limit (50).")
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
});
