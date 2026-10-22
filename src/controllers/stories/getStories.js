import { getStories as getStoriesService } from "../../services/stories.js";

export const getStories = async (_req, res) => {
  const data = await getStoriesService(res.locals.storiesQuery);
  res.status(200).json({ status: 200, data });
};
