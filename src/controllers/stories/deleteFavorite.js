import { deleteFavorite as removeFavorite } from "../../services/stories/deleteFavorite.js";

export const deleteFavorite = async (req, res) => {
  const user = await removeFavorite(req.user, req.params.storyId);
  res.json(user);
};
