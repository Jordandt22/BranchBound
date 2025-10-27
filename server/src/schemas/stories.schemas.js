import * as Yup from "yup";

// ---- Params Request ----

export const StoryIDSchema = Yup.object({
  storyID: Yup.string().trim().uuid().required(),
});

export const StoryIDAndCharacterIDSchema = Yup.object({
  storyID: Yup.string().trim().uuid().required(),
  characterID: Yup.string().trim().uuid().required(),
});

// ---- Body Request ----
