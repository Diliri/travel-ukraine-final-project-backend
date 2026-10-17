import { registerUser } from "./auth/registerUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { loginUser } from "./auth/loginUser.js";

import { getCategories } from "./categories/getCategories.js";

export const auth = {
  registerUser,
  logoutUser,
  loginUser,
};

export const categories = {
  getCategories,
};
