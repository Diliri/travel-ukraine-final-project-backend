import {
  registerUser,
  logoutUser,
  loginUser,
  refreshUserSession,
  getMe,
  checkSession,
} from './auth/authControllers.js';

import { getCategories } from './categories/getCategories.js';
import { getStories } from './stories/getStories.js';
import { getStoryById } from './stories/getStoryById.js';
import { addToFavorite } from './stories/addToFavorite.js';
import { deleteFavorite } from './stories/deleteFavorite.js';
import { getMyStories } from './stories/getMyStories.js';
import { getSavedStories } from './stories/getSavedStories.js';

import { getTravellers } from './users/getTravellers.js';
import { getTravellerProfile } from './users/getTravellerProfile.js';
import { updateUserProfile } from './users/updateUserProfile.js';
import { updateUserAvatar } from './users/updateUserAvatar.js';
import { updateUserPassword } from './users/updateUserPassword.js';
import { getCurrentUser } from './users/getCurrentUser.js';

export const auth = {
  registerUser,
  logoutUser,
  loginUser,
  refreshUserSession,
  getMe,
  checkSession,
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
};

export const users = {
  getTravellers,
  getTravellerProfile,
  updateUserProfile,
  updateUserAvatar,
  updateUserPassword,
  getCurrentUser,
};
