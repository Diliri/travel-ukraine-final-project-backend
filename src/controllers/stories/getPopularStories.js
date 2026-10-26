import { getPopularStories as findPopular } from "../../services/stories/getPopularStories.js";

export const getPopularStories = async (req, res) => {
  res.json(await findPopular(req.query));
};
