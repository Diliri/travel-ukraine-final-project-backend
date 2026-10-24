// src/routes/authRouter.js

import { Router } from "express";

import { auth as ctrl } from "../controllers/index.js";

import {
  registerUserValidation,
  loginUserValidation,
} from "../validations/index.js";

import { authenticate } from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", registerUserValidation, ctrl.registerUser);
authRouter.post("/logout", authenticate, ctrl.logoutUser);
authRouter.post("/login", loginUserValidation, ctrl.loginUser);
authRouter.post("/refresh", ctrl.refreshUserSession);

export default authRouter;
