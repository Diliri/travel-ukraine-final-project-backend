import { Router } from "express";
import { celebrate } from "celebrate";
import { stories as ctrl } from "../controllers/index.js";
import { storyIdSchema } from "../validations/storyValidation.js";

const storiesRouter = Router();

storiesRouter.get("/:storyId", celebrate(storyIdSchema), ctrl.getStoryById);

export default storiesRouter;
