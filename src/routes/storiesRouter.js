import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
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
  ctrl.getStoryById,
);
storiesRouter.post(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  ctrl.addToFavorite,
);
storiesRouter.delete(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  ctrl.deleteFavorite,
);



storiesRouter.get("/", ctrl.getStories);
storiesRouter.get("/me", authenticate, ctrl.getMyStories);
storiesRouter.get("/saved", authenticate, ctrl.getSavedStories);
storiesRouter.get("/:storyId", celebrate(storyIdSchema), ctrl.getStoryById);
storiesRouter.patch("/:storyId/favorite", authenticate, ctrl.toggleFavorite);

export default storiesRouter;
