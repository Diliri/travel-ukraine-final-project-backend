import { deleteFavorite as deleteStoryFromFavorite } from "../../services/stories/deleteFavorite.js";

export const deleteFavorite = async (req, res) => {
  const user = await deleteStoryFromFavorite(req.user, req.params.storyId);
  res.status(200).json(user);
};
