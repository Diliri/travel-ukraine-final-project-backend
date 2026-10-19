import createHttpError from "http-errors";
import { StoryModel } from "../../models/story.js";

export const getStoryById = async (storyId) => {
  const story = await StoryModel.findById(storyId);
  // .populate("ownerId", "name avatarUrl")
  // .populate("category", "category");
  console.log(storyId);

  if (!story) throw createHttpError(404, "Історію не знайдено");

  return story;
};
