import { Router } from 'express';
import {
  loginUserValidation,
  registerUserValidation,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  getMe,
  checkSession,
} from '../controllers/auth/authControllers.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post('/register', registerUserValidation, registerUser);

import { auth as ctrl } from "../controllers/index.js";
import { celebrate } from "celebrate";

import {
  registerUserValidation,
  loginUserValidation,
  getPopularStoriesValidation,
} from "../validations/index.js";

authRouter.post('/logout', authenticate, logoutUser);

authRouter.get('/me', authenticate, getMe);

authRouter.get('/session', authenticate, checkSession);
authRouter.post("/register", registerUserValidation, ctrl.registerUser);
authRouter.post("/logout", authenticate, ctrl.logoutUser);
authRouter.post("/login", loginUserValidation, ctrl.loginUser);
authRouter.post("/refresh", ctrl.refreshUserSession);
// перенесли сюди, щоб не викидало помилку
authRouter.get(
  "/popular",
  celebrate(getPopularStoriesValidation),
  ctrl.getPopularStories
);

export default authRouter;
