import { addToFavorite as addStoryToFavorite } from "../../services/stories/addToFavorite.js";

export const addToFavorite = async (req, res) => {
  const user = await addStoryToFavorite(req.user, req.params.storyId);
  res.status(200).json(user);
};
