import { StoryModel } from "../../models/story.js";

export const getCurrentUser = async (req, res) => {
  const count = await StoryModel.countDocuments({ ownerId: req.user._id });
  res.json({
    ...req.user.toJSON(),
    articlesAmount: count,
    storiesCount: count,
  });
};
