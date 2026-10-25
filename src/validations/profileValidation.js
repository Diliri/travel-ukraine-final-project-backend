import { Joi, Segments } from "celebrate";

// Правила з Validation rules (auth form):
// name — max 32, required; email — email, max 64, required; password — min 8, max 128, required
export const updateProfileValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().max(32).required(),
    email: Joi.string().trim().lowercase().email().max(64).required(),
  }),
};

export const updatePasswordValidation = {
  [Segments.BODY]: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .invalid(Joi.ref("currentPassword")) // новий пароль має відрізнятись від поточного
      .required(),
  }),
};

export const getProfileWithStoriesValidation = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),

  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export const savedStoryParamsValidation = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().hex().length(24).required(),
  }),
};

export const getProfilesValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export const confirmEmailValidation = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
  }),
};
