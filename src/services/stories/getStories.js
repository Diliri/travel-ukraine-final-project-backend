import { StoryModel } from "../../models/story.js";
import { UserModel } from "../../models/user.js";

export const getStories = async ({ page, perPage, category }) => {
  const filter = category ? { category } : {};
  const skip = (page - 1) * perPage;

  const [stories, totalItems] = await Promise.all([
    StoryModel.find(filter)
      .select("title img desc author ownerId category rate date createdAt")
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(perPage)
      .populate({ path: "ownerId", model: UserModel, select: "name" })
      .lean(),
    StoryModel.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    stories,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1 && totalItems > 0,
  };
};
