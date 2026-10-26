import createHttpError from "http-errors";
import { createStory as saveStory } from "../../services/stories/createStory.js";

export const createStory = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "Зображення історії обов'язкове (поле img)");
  }
  const story = await saveStory({
    ...req.body,
    file: req.file,
    user: req.user,
  });
  res.status(201).json(story);
};
