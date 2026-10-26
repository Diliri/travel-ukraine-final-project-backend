import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import { upload } from "../middlewares/multer.js";
import { stories as ctrl } from "../controllers/index.js";
import {
  createStoryValidation,
  getAllStoriesValidation,
  validateRecommendationsQuery,
  storyIdValidation,
  savedStoryParamsValidation,
} from "../validations/index.js";

const storiesRouter = Router();
storiesRouter.get("/", celebrate(getAllStoriesValidation), ctrl.getStories);

storiesRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  celebrate(createStoryValidation),
  ctrl.createStory,
);

storiesRouter.get(
  "/:storyId/recommendations",
  isValidId("storyId"),
  validateRecommendationsQuery,
  ctrl.getStoryRecommendations,
);

storiesRouter.get(
  "/:storyId",
  isValidId("storyId"),
  celebrate(storyIdValidation),
  ctrl.getStoryById,
);

// Обране
storiesRouter.post(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  celebrate(savedStoryParamsValidation),
  ctrl.addToFavorite,
);

storiesRouter.delete(
  "/:storyId/favorite",
  isValidId("storyId"),
  authenticate,
  celebrate(savedStoryParamsValidation),
  ctrl.deleteFavorite,
);

export default storiesRouter;
