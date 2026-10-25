import { Joi, Segments } from "celebrate";
import createHttpError from "http-errors";

export const getPopularStoriesValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(30).default(5),
    category: Joi.string().trim(),
  }),
};

export const getAllStoriesValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(30).default(10),
    category: Joi.string().optional(),
    type: Joi.string().valid("popular").optional(),
  }),
};

export const storyIdValidation = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().hex().length(24).required(),
  }),
};

export const paginationValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(30).default(10),
  }),
};

export const createStoryValidation = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(2).max(40).required(),
    article: Joi.string().trim().min(12).max(3000).required(),
    category: Joi.string().hex().length(24).required(),
  }),
};

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
