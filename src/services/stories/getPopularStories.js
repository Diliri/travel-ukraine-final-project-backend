import { getStories } from "./getStories.js";

export const getPopularStories = (query = {}) =>
  getStories({
    ...query,
    perPage: query.perPage ?? 5,
    type: "popular",
  });
