import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { stories as ctrl } from "../controllers/index.js";
import { storyIdSchema } from "../validations/storyValidation.js";
import { getPopularStoriesController } from "../controllers/stories/getPopularStoriesController.js";

const storiesRouter = Router();
storiesRouter.get("/", ctrl.getStories);
storiesRouter.get(
  "/:storyId",
  isValidId("storyId"),
  celebrate(storyIdSchema),
  ctrl.getStoryById
);
// розбити на два різні запити __
storiesRouter.post(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  ctrl.addToFavorite
);
storiesRouter.delete(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  ctrl.deleteFavorite
);

storiesRouter.get("/popular", getPopularStoriesController);

export default storiesRouter;
