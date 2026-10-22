import { Router } from "express";
import { getPopularStories } from "../services/stories/getPopularStories.js";

const homeRouter = Router();

homeRouter.get("/", async (req, res, next) => {
  try {
    const popularStories = await getPopularStories();
    res.status(200).json({
      status: 200,
      message: "Successfully fetched home page data!",
      data: {
        popularStories,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default homeRouter;
