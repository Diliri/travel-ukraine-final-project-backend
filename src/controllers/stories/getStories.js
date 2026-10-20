import { StoryModel } from "../../models/story.js";

export const getStories = async (req, res) => {
  const stories = await StoryModel.find();

  res.json(stories);
};
