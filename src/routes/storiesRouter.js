import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { stories as ctrl } from "../controllers/index.js";
import { storyIdSchema } from "../validations/storyValidation.js";
import { getPopularStoriesController } from "../controllers/stories/getPopularStoriesController.js";
import { isValidId } from "../middlewares/isValidId.js";
const storiesRouter = Router();
storiesRouter.get("/", ctrl.getStories);
storiesRouter.get("/popular", getPopularStoriesController);
storiesRouter.get(
  "/:storyId",
  isValidId("storyId"),
  celebrate(storyIdSchema),
  ctrl.getStoryById
);
// розбити на два різні запити __
console.log("isValidId:", typeof isValidId);
console.log("authenticate:", typeof authenticate);
console.log("addToFavorite:", typeof ctrl.addToFavorite);

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



export default storiesRouter;
