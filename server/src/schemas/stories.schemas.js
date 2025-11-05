import * as Yup from "yup";

// ---- Params Request ----

export const StorySlugSchema = Yup.object({
  slug: Yup.string()
    .min(3, "Slug must be atleast 3 characters.")
    .max(50, "Slug must be less than 50 characters.")
    .trim()
    .required(),
});

export const StoryIDAndCharacterIDSchema = Yup.object({
  storyID: Yup.string().trim().uuid().required(),
  characterID: Yup.string().trim().uuid().required(),
});

// ---- Body Request ----
