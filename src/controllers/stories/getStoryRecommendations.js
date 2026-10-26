import { getStoryRecommendations as getRecommendations } from "../../services/stories/getStoryRecommendations.js";

export const getStoryRecommendations = async (req, res) => {
  const result = await getRecommendations({
    storyId: req.params.storyId,
    page: res.locals.recommendationsQuery.page,
    perPage: res.locals.recommendationsQuery.perPage,
  });

  res.status(200).json({
    status: 200,
    message: "Story recommendations fetched successfully",
    data: result.stories,
    pagination: result.pagination,
  });
};
