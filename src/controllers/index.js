import { registerUser } from "./auth/registerUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { loginUser } from "./auth/loginUser.js";

import { getCategories } from "./categories/getCategories.js";
import { getStories } from "./stories/getStories.js";
import { toggleFavorite } from "./stories/toggleFavorite.js";

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
  getStories,
  toggleFavorite,
};
export const users = {
  // ...методи Скрам-майстра (напр. getCurrentUser)
  updateUserProfile,
  updateUserAvatar,
};
