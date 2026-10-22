import { Joi } from "celebrate";
import createHttpError from "http-errors";

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).max(1_000_000).default(1),
  perPage: Joi.number().integer().min(1).max(100).default(12),
  category: Joi.string().pattern(/^[a-fA-F0-9]{24}$/),
});

export const validateStoriesQuery = (req, res, next) => {
  const { value, error } = querySchema.validate(req.query, {
    abortEarly: false,
  });

  if (error) {
    return next(createHttpError(400, error.message));
  }

  // В Express 5 req.query доступний лише для читання.
  res.locals.storiesQuery = value;
  next();
};
