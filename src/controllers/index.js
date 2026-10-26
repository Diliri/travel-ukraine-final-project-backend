import { loginUser } from "./auth/loginUser.js";
import { logoutUser, refreshUserSession } from "./auth/logoutUser.js";
import { registerUser } from "./auth/registerUser.js";
import { getMe, checkSession } from "./auth/authControllers.js";
import { getCategories } from "./categories/getCategories.js";
import { addToFavorite } from "./stories/addToFavorite.js";
import { createStory } from "./stories/createStory.js";
import { deleteFavorite } from "./stories/deleteFavorite.js";
import { getMyStories } from "./stories/getMyStories.js";
import { getPopularStories } from "./stories/getPopularStories.js";
import { getRecommendedStories } from "./stories/getRecommendedStories.js";
import { getSavedStories } from "./stories/getSavedStories.js";
import { getStories } from "./stories/getStories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { getCurrentUser } from "./users/getCurrentUser.js";
import { getTravellerProfile } from "./users/getTravellerProfile.js";
import { getTravellers } from "./users/getTravellers.js";
import { updateUserAvatar } from "./users/updateUserAvatar.js";
import { updateUserPassword } from "./users/updateUserPassword.js";
import { updateUserProfile } from "./users/updateUserProfile.js";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  getMe,
  checkSession,
  getPopularStories,
};
export const categories = { getCategories };
export const stories = {
  getStories,
  getStoryById,
  getMyStories,
  getSavedStories,
  getPopularStories,
  getRecommendedStories,
  createStory,
  addToFavorite,
  deleteFavorite,
};
export const users = {
  getTravellers,
  getTravellerProfile,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
  updateUserPassword,
};
