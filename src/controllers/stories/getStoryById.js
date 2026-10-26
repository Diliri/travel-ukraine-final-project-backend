import { getStoryById as findStory } from "../../services/stories/getStoryById.js";

export const getStoryById = async (req, res) => {
  res.json(await findStory(req.params.storyId));
};
