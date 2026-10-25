import { StoryModel } from "../../models/story.js";
import { CategoryModel } from "../../models/category.js";
import createHttpError from "http-errors";

export const getStories = async (req, res) => {
  const limit = req.query.limit === undefined ? 9 : Number(req.query.limit);
  const page = req.query.page === undefined ? 1 : Number(req.query.page);
  const category =
    req.query.category === undefined ? "" : String(req.query.category);

  if (!Number.isInteger(limit) || ![8, 9].includes(limit)) {
    return res.status(400).json({ message: 'limit must be 8 or 9' });
  }

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({ message: 'page must be a positive integer' });
  }

  // створила об'єкт фільтра
  const filter = {};
  if (category) {
    const categoryDoc = await CategoryModel.findOne({ category });
    if (categoryDoc === null) {
      throw createHttpError(404, "Category not found");
    }
    // додати категорію до фільтра
    filter.category = categoryDoc._id;
  }

  // виконуємо запит один раз, передаючи готовий filter
  const stories = await StoryModel.find(filter)
    .populate("ownerId", "name")
    .sort({ createdAt: -1, _id: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return res.json(stories);
};
