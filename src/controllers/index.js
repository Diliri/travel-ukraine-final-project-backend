import { registerUser } from "./auth/registerUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { loginUser } from "./auth/loginUser.js";

import { getCategories } from "./categories/getCategories.js";
import { getStories } from "./stories/getStories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { toggleFavorite } from "./stories/toggleFavorite.js";

// Импортируем твои контроллеры для пользователей
import { getTravellers } from "./users/getTravellers.js";
import { getTravellerProfile } from "./users/getTravellerProfile.js";
import { updateUserProfile } from "./users/updateUserProfile.js";
import { updateUserAvatar } from "./users/updateUserAvatar.js";

export const auth = {
  registerUser,
  logoutUser,
  loginUser,
};

export const categories = {
  getCategories,
};
export const stories = {
  getStoryById,
  getStories,
  getStoryById,
  toggleFavorite,
};
export const users = {
  getTravellers,
  getTravellerProfile,
  updateUserProfile,
  updateUserAvatar,
};
