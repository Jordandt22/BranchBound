import * as yup from "yup";

export const createProfileSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")
    .required("Username is required"),
  age: yup
    .number()
    .min(13, "You must be at least 13 years old")
    .required("Age is required")
    .typeError("Please enter a valid age"),
});
