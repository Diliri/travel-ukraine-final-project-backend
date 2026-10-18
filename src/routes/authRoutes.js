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

export const authRouter = Router();

authRouter.post(
  '/api/auth/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRouter.post(
  '/api/auth/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

authRouter.post('/api/auth/refresh', refreshUserSession);

authRouter.post('/api/auth/logout', authenticate, logoutUser);

authRouter.get('/api/auth/me', authenticate, getMe);

authRouter.get('/api/auth/session', authenticate, checkSession);