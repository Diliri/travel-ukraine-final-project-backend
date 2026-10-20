import createHttpError from "http-errors";
import { StoryModel } from "../../models/story.js";

export const toggleFavorite = async (user, storyId) => {
  const story = await StoryModel.findById(storyId);

  if (!story) {
    throw createHttpError(404, "Story not found");
  }

  const isFavorite = user.savedArticles.some((savedStoryId) =>
    savedStoryId.equals(story._id),
  );

  if (isFavorite) {
    user.savedArticles.pull(story._id);
  } else {
    user.savedArticles.addToSet(story._id);
  }

  return user.save();
};
