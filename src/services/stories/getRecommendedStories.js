import createHttpError from "http-errors";
import { StoryModel } from "../../models/story.js";
import { getStories } from "./getStories.js";

export const getRecommendedStories = async (storyId, query = {}) => {
  const story = await StoryModel.findById(storyId).select("category");
  if (!story) throw createHttpError(404, "Story not found");

  return getStories({
    page: query.page ?? 1,
    perPage: query.perPage ?? 5,
    category: String(story.category),
    type: "popular",
    excludedStoryId: story._id,
  });
};
