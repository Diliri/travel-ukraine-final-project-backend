import { Router } from "express";
import { auth as ctrl } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validations/index.js";

const authRouter = Router();

// Registration creates a session; refresh authenticates with refresh cookies.
authRouter.post("/register", registerUserValidation, ctrl.registerUser);
authRouter.post("/login", loginUserValidation, ctrl.loginUser);
authRouter.post("/refresh", ctrl.refreshUserSession);
authRouter.post("/logout", authenticate, ctrl.logoutUser);

// Optional frontend session helpers; canonical profile: GET /api/users/me.
authRouter.get("/session", authenticate, ctrl.checkSession);
authRouter.get("/me", authenticate, ctrl.getMe);

export default authRouter;
