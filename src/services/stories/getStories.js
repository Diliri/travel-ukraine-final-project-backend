import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { CategoryModel } from "../../models/category.js";
import { StoryModel } from "../../models/story.js";
import { getPagination, paginationMeta } from "../../utils/pagination.js";

// Accept either a category ID or its label until frontend contracts are finalized.
export const resolveCategoryId = async (category) => {
  if (!category) return undefined;
  const doc = isValidObjectId(category)
    ? await CategoryModel.findById(category)
    : await CategoryModel.findOne({ category });
  if (!doc) throw createHttpError(404, "Category not found");
  return doc._id;
};

export const getStories = async (query = {}) => {
  const { category, type, excludedStoryId } = query;
  const { page, perPage, skip } = getPagination(query);
  const categoryId = await resolveCategoryId(category);
  const filter = {};
  if (categoryId) filter.category = categoryId;
  if (excludedStoryId) filter._id = { $ne: excludedStoryId };
  const sort =
    type === "popular" ? { rate: -1, _id: -1 } : { createdAt: -1, _id: -1 };

  const [stories, totalItems] = await Promise.all([
    StoryModel.find(filter)
      .populate("ownerId", "name avatarUrl")
      .sort(sort)
      .skip(skip)
      .limit(perPage)
      .lean(),
    StoryModel.countDocuments(filter),
  ]);
  return { stories, pagination: paginationMeta(totalItems, page, perPage) };
};
