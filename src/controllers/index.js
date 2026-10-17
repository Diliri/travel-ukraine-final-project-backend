import { registerUser } from "./auth/registerUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { loginUser } from "./auth/loginUser.js";

import { getCategories } from "./categories/getCategories.js";

// Импортируем твои контроллеры для пользователей
import { getTravellers } from "./users/getTravellers.js";
import { getTravellerProfile } from "./users/getTravellerProfile.js";

export const auth = {
  registerUser,
  logoutUser,
  loginUser,
};

export const categories = {
  getCategories,
};

// Создаем объект экспорта для твоих контроллеров
export const users = {
  getTravellers,
  getTravellerProfile,
};