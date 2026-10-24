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

authRouter.post('/login', loginUserValidation, loginUser);

authRouter.post('/refresh', refreshUserSession);

authRouter.post('/logout', authenticate, logoutUser);

authRouter.get('/me', authenticate, getMe);

authRouter.get('/session', authenticate, checkSession);

export default authRouter;
