import { StoryModel } from "../../models/story.js";

export const getMyStories = async (req, res) => {
  const stories = await StoryModel.find({
    ownerId: req.user._id,
  });

  res.json(stories);
};
