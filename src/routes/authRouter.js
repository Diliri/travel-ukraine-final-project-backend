// src/routes/authRouter.js

import { Router } from "express";

import { auth as ctrl } from "../controllers/index.js";

import { registerUserValidation } from "../validations/authValidation.js";

const authRouter = Router();

authRouter.post("/register", registerUserValidation, ctrl.registerUser);
authRouter.post("/logout", ctrl.logoutUser);
authRouter.post("/login", ctrl.loginUser);

export default authRouter;
