import { registerUser } from "./auth/registerUser.js";
import { logoutUser, refreshUserSession } from "./auth/logoutUser.js";
import { loginUser } from "./auth/loginUser.js";
import { getMe, checkSession } from "./auth/authControllers.js";

import { getCategories } from "./categories/getCategories.js";
import { getStories } from "./stories/getStories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { addToFavorite } from "./stories/addToFavorite.js";
import { deleteFavorite } from "./stories/deleteFavorite.js";
import { getMyStories } from "./stories/getMyStories.js";
import { getSavedStories } from "./stories/getSavedStories.js";
import { createStory } from "./stories/createStory.js";
import { getStoryRecommendations } from "./stories/getStoryRecommendations.js";

import { getTravellers } from "./users/getTravellers.js";
import { getTravellerProfile } from "./users/getTravellerProfile.js";
import { updateUserProfile } from "./users/updateUserProfile.js";
import { updateUserAvatar } from "./users/updateUserAvatar.js";
import { updateUserPassword } from "./users/updateUserPassword.js";
import { getCurrentUser } from "./users/getCurrentUser.js";

import { getPopularStories } from "./stories/getPopularStories.js";

export const auth = {
  registerUser,
  logoutUser,
  loginUser,
  refreshUserSession,
  getMe,
  checkSession,
  getPopularStories,
};

export const categories = {
  getCategories,
};

export const stories = {
  getStories,
  getStoryById,
  addToFavorite,
  deleteFavorite,
  getMyStories,
  getSavedStories,
  createStory,
  getStoryRecommendations,
};

export const users = {
  getTravellers,
  getTravellerProfile,
  updateUserProfile,
  updateUserAvatar,
  updateUserPassword,
  getCurrentUser,
};
