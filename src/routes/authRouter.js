// src/routes/authRouter.js

import { Router } from "express";

import { auth as ctrl } from "../controllers/index.js";

import { registerUserValidation, loginUserValidation } from "../validations/authValidation.js";

const authRouter = Router();

authRouter.post("/register", registerUserValidation, ctrl.registerUser);
authRouter.post("/logout", ctrl.logoutUser);
authRouter.post("/login", loginUserValidation, ctrl.loginUser);

export default authRouter;
