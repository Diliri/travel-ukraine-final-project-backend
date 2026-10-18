import { celebrate, Joi } from "celebrate";

export const registerUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().trim().max(32).required(),
    email: Joi.string().trim().email().max(64).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
});
