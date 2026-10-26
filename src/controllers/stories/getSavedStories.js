import { StoryModel } from "../../models/story.js";
import { getPagination, paginationMeta } from "../../utils/pagination.js";

export const getSavedStories = async (req, res) => {
  const { page, perPage, skip } = getPagination(req.query);
  const filter = { _id: { $in: req.user.savedArticles } };
  const [stories, totalItems] = await Promise.all([
    StoryModel.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(perPage)
      .lean(),
    StoryModel.countDocuments(filter),
  ]);
  res.json({ stories, pagination: paginationMeta(totalItems, page, perPage) });
};
