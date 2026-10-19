import { Joi, Segments } from "celebrate";

// Правила з Validation rules (auth form): name — max 32, required; email — email, max 64, required
export const updateProfileSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().max(32).required(),
    email: Joi.string().trim().lowercase().email().max(64).required(),
  }),
};
