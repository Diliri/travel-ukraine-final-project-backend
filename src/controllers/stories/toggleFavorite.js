import { toggleFavorite as toggleFavoriteStory } from "../../services/stories/toggleFavorite.js";

export const toggleFavorite = async (req, res) => {
  const user = await toggleFavoriteStory(req.user, req.params.storyId);
  res.status(200).json(user);
};
