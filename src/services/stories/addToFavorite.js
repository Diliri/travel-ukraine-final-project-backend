import createHttpError from "http-errors";
import { StoryModel } from "../../models/story.js";

export const addToFavorite = async (user, storyId) => {
  const story = await StoryModel.findById(storyId);

  if (!story) {
    throw createHttpError(404, "Story not found");
  }

  user.savedArticles.addToSet(story._id);
  return user.save();
};
