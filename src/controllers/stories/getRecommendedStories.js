import { getRecommendedStories as findRecommended } from "../../services/stories/getRecommendedStories.js";

export const getRecommendedStories = async (req, res) => {
  res.json(await findRecommended(req.params.storyId, req.query));
};
