import createHttpError from "http-errors";
import { CategoryModel } from "../../models/category.js";
import { StoryModel } from "../../models/story.js";
import { UserModel } from "../../models/user.js";

export const getStoryRecommendations = async ({ storyId, page, perPage }) => {
  const sourceStory = await StoryModel.findById(storyId)
    .select("category")
    .lean();

  if (!sourceStory) {
    throw createHttpError(404, "Story not found");
  }

  const [result] = await StoryModel.aggregate([
    {
      $match: {
        _id: { $ne: sourceStory._id },
        category: sourceStory.category,
      },
    },
    {
      $lookup: {
        from: UserModel.collection.name,
        localField: "_id",
        foreignField: "savedArticles",
        as: "savedBy",
      },
    },
    { $set: { rate: { $size: "$savedBy" } } },
    { $unset: "savedBy" },
    { $sort: { rate: -1, createdAt: -1, _id: -1 } },
    {
      $facet: {
        metadata: [{ $count: "totalItems" }],
        stories: [
          { $skip: (page - 1) * perPage },
          { $limit: perPage },
          {
            $lookup: {
              from: UserModel.collection.name,
              localField: "ownerId",
              foreignField: "_id",
              pipeline: [{ $project: { name: 1, avatarUrl: 1 } }],
              as: "owner",
            },
          },
          {
            $lookup: {
              from: CategoryModel.collection.name,
              localField: "category",
              foreignField: "_id",
              pipeline: [{ $project: { category: 1 } }],
              as: "categoryDetails",
            },
          },
          {
            $set: {
              ownerId: { $first: "$owner" },
              category: { $first: "$categoryDetails" },
            },
          },
          { $unset: ["owner", "categoryDetails"] },
        ],
      },
    },
  ]);

  const totalItems = result?.metadata[0]?.totalItems ?? 0;
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    stories: result?.stories ?? [],
    pagination: {
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
