import { Router } from 'express';
import { celebrate } from 'celebrate';
import { users } from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { uploadAvatar } from '../middlewares/uploadAvatar.js';
import {
  updateProfileSchema,
  updatePasswordSchema,
} from '../validations/profileValidation.js';

const usersRouter = Router();

usersRouter.get('/', users.getTravellers);
usersRouter.get('/me', authenticate, users.getCurrentUser);

usersRouter.patch(
  '/me',
  authenticate,
  celebrate(updateProfileSchema),
  users.updateUserProfile,
);

usersRouter.patch(
  '/me/avatar',
  authenticate,
  uploadAvatar,
  users.updateUserAvatar,
);

usersRouter.patch(
  '/me/password',
  authenticate,
  celebrate(updatePasswordSchema),
  users.updateUserPassword,
);

usersRouter.get(
  '/:travellerId',
  isValidId('travellerId'),
  users.getTravellerProfile,
);

export default usersRouter;
