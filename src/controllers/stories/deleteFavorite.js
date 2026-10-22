import { deleteFavorite as deleteFavoriteStory } from "../../services/stories/deleteFavorite.js";

export const deleteFavorite = async (req, res, next) => {
  try {
    const user = await deleteFavoriteStory(req.user, req.params.storyId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};