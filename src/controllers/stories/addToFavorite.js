import { addToFavorite as saveFavorite } from "../../services/stories/addToFavorite.js";

export const addToFavorite = async (req, res) => {
  const user = await saveFavorite(req.user, req.params.storyId);
  res.json(user);
};
