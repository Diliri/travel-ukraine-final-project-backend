import { celebrate } from "celebrate";
import { Router } from "express";
import { stories as ctrl } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import { uploadStoryImage } from "../middlewares/uploadStoryImage.js";
import {
  createStoryValidation,
  getAllStoriesValidation,
  getPopularStoriesValidation,
  paginationValidation,
  savedStoryParamsValidation,
  storyIdValidation,
} from "../validations/index.js";

const storiesRouter = Router();

// Main catalog, including ?category=...&page=...&perPage=...&type=popular.
storiesRouter.get("/", celebrate(getAllStoriesValidation), ctrl.getStories);

// Optional shortcut for the homepage slider; canonical popular filter is above.
storiesRouter.get(
  "/popular",
  celebrate(getPopularStoriesValidation),
  ctrl.getPopularStories
);

storiesRouter.post(
  "/",
  authenticate,
  uploadStoryImage,
  celebrate(createStoryValidation),
  ctrl.createStory
);

const recommendedHandlers = [
  isValidId("storyId"),
  celebrate(storyIdValidation),
  celebrate(paginationValidation),
  ctrl.getRecommendedStories,
];
storiesRouter.get("/:storyId/recommended", ...recommendedHandlers);

storiesRouter.get("/:storyId/recommendations", ...recommendedHandlers);

storiesRouter.get(
  "/:storyId",
  isValidId("storyId"),
  celebrate(storyIdValidation),
  ctrl.getStoryById
);

// Canonical saved-story actions are under /api/users.
storiesRouter.post(
  "/:storyId/favorite",
  authenticate,
  isValidId("storyId"),
  celebrate(savedStoryParamsValidation),
  ctrl.addToFavorite
);
storiesRouter.delete(
  "/:storyId/favorite",
  authenticate,
  isValidId("storyId"),
  celebrate(savedStoryParamsValidation),
  ctrl.deleteFavorite
);

export default storiesRouter;
