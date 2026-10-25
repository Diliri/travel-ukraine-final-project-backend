import { Router } from "express";
import { celebrate } from "celebrate";
import { users, stories } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import { uploadAvatar } from "../middlewares/uploadAvatar.js";
import {
  updateProfileValidation,
  updatePasswordValidation,
  getProfilesValidation,
  paginationValidation,
} from "../validations/index.js";

const usersRouter = Router();

// Получить список всех путешественников (авторов)
usersRouter.get("/", celebrate(getProfilesValidation), users.getTravellers);

// Получить данные текущего авторизованного пользователя
usersRouter.get("/me", authenticate, users.getCurrentUser);

usersRouter.get(
  "/me/stories",
  authenticate,
  celebrate(paginationValidation),
  stories.getMyStories
);

// Маршруты личного кабинета: профиль, аватар, пароль.
// ВАЖНО: стоять ПЕРЕД "/:travellerId", щоб "me" не сприймався як id
usersRouter.patch(
  "/me",
  authenticate,
  celebrate(updateProfileValidation),
  users.updateUserProfile
);
usersRouter.patch(
  "/me/avatar",
  authenticate,
  uploadAvatar,
  users.updateUserAvatar
);
usersRouter.patch(
  "/me/password",
  authenticate,
  celebrate(updatePasswordValidation),
  users.updateUserPassword
);

// Получить публичный профиль конкретного автора по ID
usersRouter.get(
  "/:travellerId",
  isValidId("travellerId"),
  users.getTravellerProfile
);

export default usersRouter;
