import { getStoryById as getStory } from "../../services/stories/getStoryById.js";

// GET /api/stories/:storyId
export const getStoryById = async (req, res) => {
  const story = await getStory(req.params.storyId);
  res.status(200).json(story);
};
