import createHttpError from "http-errors";
import { StoryModel } from "../../models/story.js";
import { UserModel } from "../../models/user.js";

export const deleteFavorite = async (user, storyId) => {
  const story = await StoryModel.findById(storyId);
  if (!story) throw createHttpError(404, "Story not found");

  const updated = await UserModel.findOneAndUpdate(
    { _id: user._id, savedArticles: story._id },
    { $pull: { savedArticles: story._id } },
    { new: true }
  );
  if (updated) {
    // Prevent negative counters in legacy data; transaction is still pending.
    await StoryModel.updateOne(
      { _id: story._id, rate: { $gt: 0 } },
      { $inc: { rate: -1 } }
    );
  }
  return updated ?? UserModel.findById(user._id);
};
