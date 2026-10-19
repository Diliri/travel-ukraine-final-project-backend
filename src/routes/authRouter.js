// src/routes/authRouter.js

import { Router } from "express";
import { celebrate } from 'celebrate';
import { loginUserSchema } from '../validations/loginValidation.js';
import { loginUser } from '../controllers/auth/loginUser.js';

import { auth as ctrl } from "../controllers/index.js";

import { registerUserValidation } from "../validations/authValidation.js";

const authRouter = Router();

authRouter.post("/register", registerUserValidation, ctrl.registerUser);
authRouter.post("/logout", ctrl.logoutUser);
authRouter.post(
  "/auth/login",
  celebrate(loginUserSchema),
  loginUser);

export default authRouter;
