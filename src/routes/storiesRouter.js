import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import { stories as ctrl } from "../controllers/index.js";
import {
  getAllStoriesValidation,
  storyIdValidation,
  savedStoryParamsValidation,
  validateStoriesQuery, // для категорій ?
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
  celebrate(savedStoryParamsValidation),
  ctrl.addToFavorite
);

storiesRouter.delete(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  celebrate(savedStoryParamsValidation),
  ctrl.deleteFavorite
);

export default storiesRouter;
