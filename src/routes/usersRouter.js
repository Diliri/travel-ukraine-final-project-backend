import { Router } from "express";

const usersRouter = Router();

export default usersRouter;

import { celebrate } from "celebrate";
import { users as ctrl } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js"; // ← ще не існує, робить автор login/auth
import { uploadAvatar } from "../middlewares/uploadAvatar.js";
import { updateProfileSchema } from "../validations/profileValidation.js";

usersRouter.patch("/me", authenticate, celebrate(updateProfileSchema), ctrl.updateUserProfile);
usersRouter.patch("/me/avatar", authenticate, uploadAvatar, ctrl.updateUserAvatar);