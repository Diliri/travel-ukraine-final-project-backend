import { Router } from "express";
import { celebrate } from "celebrate";
import { users } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import { uploadAvatar } from "../middlewares/uploadAvatar.js";
import { updateProfileSchema } from "../validations/profileValidation.js";

const usersRouter = Router();

// Получить список всех путешественников (авторов)
usersRouter.get("/", users.getTravellers);

// Получить данные текущего авторизованного пользователя
usersRouter.get("/me", authenticate, users.getCurrentUser);

// Получить публичный профиль конкретного автора по ID
usersRouter.get("/:travellerId", users.getTravellerProfile);

// Маршруты для личного кабинета (Позиция 2)
usersRouter.patch(
  "/me",
  authenticate,
  celebrate(updateProfileSchema),
  users.updateUserProfile,
);
usersRouter.patch(
  "/me/avatar",
  authenticate,
  uploadAvatar,
  users.updateUserAvatar,
);

export default usersRouter;
