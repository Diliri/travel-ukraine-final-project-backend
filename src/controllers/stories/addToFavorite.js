import { addToFavorite as addFavoriteStory } from "../../services/stories/addToFavorite.js";

export const addToFavorite = async (req, res, next) => {
  try {
    const user = await addFavoriteStory(req.user, req.params.storyId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
