import { StoryModel } from "../../models/story.js";

export const getPopularStories = async () => {
  const stories = await StoryModel.find()
    .sort({ rate: -1, _id: -1 })
    .limit(3)
    .lean();

  return stories;
};
