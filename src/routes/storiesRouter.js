import { Router } from "express";
import { validateStoriesQuery } from "../validations/stories.js";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import { stories as ctrl } from "../controllers/index.js";
import {
  getAllStoriesValidation,
  storyIdValidation,
  createStoryValidation,
} from "../validations/index.js";

const storiesRouter = Router();
storiesRouter.get("/", celebrate(getAllStoriesValidation), ctrl.getStories);
storiesRouter.get(
  "/:storyId",
  isValidId("storyId"),
  celebrate(storyIdValidation),
  ctrl.getStoryById
);
storiesRouter.post(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  celebrate(createStoryValidation),
  ctrl.addToFavorite
);

storiesRouter.delete(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  ctrl.deleteFavorite
);

export default storiesRouter;
