import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
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

authRouter.post(
  '/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRouter.post(
  '/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

authRouter.post('/refresh', refreshUserSession);

authRouter.post('/logout', authenticate, logoutUser);

authRouter.get('/me', authenticate, getMe);

authRouter.get('/session', authenticate, checkSession);

export default authRouter;
