import { Joi, Segments } from "celebrate";

// Правила з Validation rules (auth form):
// name — max 32, required; email — email, max 64, required; password — min 8, max 128, required
export const updateProfileSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().max(32).required(),
    email: Joi.string().trim().lowercase().email().max(64).required(),
  }),
};

export const updatePasswordSchema = {
  [Segments.BODY]: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .invalid(Joi.ref("currentPassword")) // новий пароль має відрізнятись від поточного
      .required(),
  }),
};
