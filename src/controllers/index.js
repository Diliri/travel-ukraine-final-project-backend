import { getStoryById } from "./stories/getStoryById.js";
import { registerUser } from "./auth/registerUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { loginUser } from "./auth/loginUser.js";

import { getCategories } from "./categories/getCategories.js";

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
};

export const users = {
  // ...методи Скрам-майстра (напр. getCurrentUser)
  updateUserProfile,
  updateUserAvatar,
};
