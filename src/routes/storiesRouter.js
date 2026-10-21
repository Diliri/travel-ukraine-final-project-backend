import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { stories as ctrl } from "../controllers/index.js";
import { storyIdSchema } from "../validations/storyValidation.js";
import { getPopularStoriesController } from "../controllers/stories/getPopularStoriesController.js";

const storiesRouter = Router();

storiesRouter.get("/", ctrl.getStories);

storiesRouter.get("/popular", getPopularStoriesController);

storiesRouter.get(
  "/:storyId",
  celebrate(storyIdSchema),
  ctrl.getStoryById,
);

storiesRouter.patch(
  "/:storyId/favorite",
  authenticate,
  ctrl.toggleFavorite,
);

export default storiesRouter;
