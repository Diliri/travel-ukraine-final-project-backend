import { registerUser } from "./auth/registerUser.js";
import { logoutUser, refreshUserSession } from "./auth/logoutUser.js";
import { loginUser } from "./auth/loginUser.js";

import { getCategories } from "./categories/getCategories.js";
import { getStories } from "./stories/getStories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { addToFavorite } from "./stories/addToFavorite.js";
import { deleteFavorite } from "./stories/deleteFavorite.js";

// Импортируем твои контроллеры для пользователей
import { getTravellers } from "./users/getTravellers.js";
import { getTravellerProfile } from "./users/getTravellerProfile.js";
import { updateUserProfile } from "./users/updateUserProfile.js";
import { updateUserAvatar } from "./users/updateUserAvatar.js";
import { updateUserPassword } from "./users/updateUserPassword.js";
import { getCurrentUser } from "./users/getCurrentUser.js";
import { getMyStories } from "./stories/getMyStories.js";
import { getSavedStories } from "./stories/getSavedStories.js";

export const auth = {
  registerUser,
  logoutUser,
  loginUser,
  refreshUserSession,
};

export const categories = {
  getCategories,
};
export const stories = {
  getStoryById,
  getStories,
  addToFavorite,
  deleteFavorite,
  getMyStories,
  getSavedStories,
};

export const users = {
  getTravellers,
  getTravellerProfile,
  updateUserProfile,
  updateUserAvatar,
  updateUserPassword,
  getCurrentUser,
};
