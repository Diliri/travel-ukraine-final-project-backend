import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { stories as ctrl } from "../controllers/index.js";
import { storyIdSchema } from "../validations/storyValidation.js";

storiesRouter.get("/", stories.getStories);
storiesRouter.get("/:storyId", celebrate(storyIdSchema), ctrl.getStoryById);
storiesRouter.patch("/:storyId/favorite", authenticate, stories.toggleFavorite);
const storiesRouter = Router();

export default storiesRouter;
