import { getStories as findStories } from "../../services/stories/getStories.js";

export const getStories = async (req, res) => {
  const result = await findStories(req.query);
  res.status(200).json(result);
};
