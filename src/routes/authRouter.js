// src/routes/authRouter.js

import { Router } from "express";

import { auth as ctrl } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", ctrl.registerUser);
authRouter.post("/logout", ctrl.logoutUser);
authRouter.post("/login", ctrl.loginUser);

export default authRouter;
