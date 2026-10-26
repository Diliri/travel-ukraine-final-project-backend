import { celebrate } from "celebrate";
import { Router } from "express";
import { stories, users } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import { uploadAvatar } from "../middlewares/uploadAvatar.js";
import {
  getProfileWithStoriesValidation,
  getProfilesValidation,
  paginationValidation,
  savedStoryParamsValidation,
  updatePasswordValidation,
  updateProfileValidation,
} from "../validations/index.js";

const usersRouter = Router();

// Public travellers list; page size supports the 12-card homepage slider.
usersRouter.get("/", celebrate(getProfilesValidation), users.getTravellers);

usersRouter.get("/me", authenticate, users.getCurrentUser);
usersRouter.get(
  "/me/stories",
  authenticate,
  celebrate(paginationValidation),
  stories.getMyStories
);
usersRouter.get(
  "/me/saved-stories",
  authenticate,
  celebrate(paginationValidation),
  stories.getSavedStories
);

// Backend spec: saving and removing stories belongs under /api/users
usersRouter.post(
  "/saved-stories/:storyId",
  authenticate,
  isValidId("storyId"),
  celebrate(savedStoryParamsValidation),
  stories.addToFavorite
);
usersRouter.delete(
  "/saved-stories/:storyId",
  authenticate,
  isValidId("storyId"),
  celebrate(savedStoryParamsValidation),
  stories.deleteFavorite
);

// Optional profile-management routes (not required for the core MVP)
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

// Keep dynamic IDs last, so /me and other static paths are never captured
usersRouter.get(
  "/:travellerId",
  isValidId("travellerId"),
  celebrate(getProfileWithStoriesValidation),
  users.getTravellerProfile
);

export default usersRouter;
