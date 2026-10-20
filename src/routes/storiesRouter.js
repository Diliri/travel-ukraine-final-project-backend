// src/routes/authRouter.js

import { Router } from "express";
import { stories } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";

const storiesRouter = Router();

storiesRouter.get("/", stories.getStories);
storiesRouter.patch("/:storyId/favorite", authenticate, stories.toggleFavorite);

export default storiesRouter;
