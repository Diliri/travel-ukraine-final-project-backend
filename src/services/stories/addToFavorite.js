import createHttpError from "http-errors";
import { StoryModel } from "../../models/story.js";
import { UserModel } from "../../models/user.js";

export const addToFavorite = async (user, storyId) => {
  const story = await StoryModel.findById(storyId);
  if (!story) throw createHttpError(404, "Story not found");

  const updated = await UserModel.findOneAndUpdate(
    { _id: user._id, savedArticles: { $ne: story._id } },
    { $addToSet: { savedArticles: story._id } },
    { new: true }
  );
  if (updated) {
    await StoryModel.updateOne({ _id: story._id }, { $inc: { rate: 1 } });
  }
  return updated ?? UserModel.findById(user._id);
};
