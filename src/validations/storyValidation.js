import { Joi, Segments } from "celebrate";

export const storyIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().hex().length(24).required(),
  }),
};
