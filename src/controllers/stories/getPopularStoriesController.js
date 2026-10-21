
import { getPopularStories } from "../../services/stories/getPopularStories.js";

export const getPopularStoriesController = async (req, res, next) => {
  try {
    const stories = await getPopularStories();

    res.status(200).json({
      status: 200,
      message: "Successfully fetched popular stories!",
      data: stories,
    });
  } catch (error) {
    next(error);
  }
};

