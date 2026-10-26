import { Joi, Segments } from "celebrate";

const paging = {
  page: Joi.number().integer().min(1).max(1_000_000).default(1),
  perPage: Joi.number().integer().min(1).max(30).default(10),
};
export const getPopularStoriesValidation = {
  [Segments.QUERY]: Joi.object({
    ...paging,
    perPage: Joi.number().integer().min(1).max(30).default(5),
    category: Joi.string().trim().min(1),
  }),
};
export const getAllStoriesValidation = {
  [Segments.QUERY]: Joi.object({
    ...paging,
    category: Joi.string().trim().min(1),
    type: Joi.string().valid("popular"),
  }),
};
export const storyIdValidation = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().hex().length(24).required(),
  }),
};
export const paginationValidation = { [Segments.QUERY]: Joi.object(paging) };
export const createStoryValidation = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(2).max(40).required(),
    article: Joi.string().trim().min(12).max(3000).required(),
    category: Joi.string().hex().length(24).required(),
  }),
};
