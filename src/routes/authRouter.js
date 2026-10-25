import { Router } from "express";
import { celebrate } from "celebrate";

import {
  registerUserValidation,
  loginUserValidation,
  getPopularStoriesValidation,
} from "../validations/index.js";
import { auth as ctrl } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = Router();

// Публічні маршрути (Public routes)
authRouter.post("/register", registerUserValidation, ctrl.registerUser);
authRouter.post("/login", loginUserValidation, ctrl.loginUser);
authRouter.post("/refresh", ctrl.refreshUserSession);

// Захищені маршрути (Protected routes)
authRouter.get("/me", authenticate, ctrl.getMe); // перенести??? видалити???
authRouter.get("/session", authenticate, ctrl.checkSession); // перенести??? видалити???
authRouter.post("/logout", authenticate, ctrl.logoutUser);

// Окремий маршрут (перенесено сюди, щоб не викидало помилку)
authRouter.get(
  "/popular",
  celebrate(getPopularStoriesValidation),
  ctrl.getPopularStories
);

export default authRouter;
