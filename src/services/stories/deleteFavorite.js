import createHttpError from "http-errors";
import { StoryModel } from "../../models/story.js";

export const deleteFavorite = async (user, storyId) => {
  const story = await StoryModel.findById(storyId);

  if (!story) {
    throw createHttpError(404, "Story not found");
  }

  user.savedArticles.pull(story._id);

  return user.save();
};