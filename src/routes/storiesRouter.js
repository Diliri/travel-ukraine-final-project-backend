import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { stories as ctrl } from '../controllers/index.js';
import { storyIdSchema } from '../validations/storyValidation.js';
import { getPopularStoriesController } from '../controllers/stories/getPopularStoriesController.js';

const storiesRouter = Router();

// Публічні
storiesRouter.get('/', ctrl.getStories);
storiesRouter.get('/popular', getPopularStoriesController);

// Для авторизованих
storiesRouter.get('/me', authenticate, ctrl.getMyStories);
storiesRouter.get('/saved', authenticate, ctrl.getSavedStories);

// Одна історія
storiesRouter.get(
  '/:storyId',
  isValidId('storyId'),
  celebrate(storyIdSchema),
  ctrl.getStoryById,
);

// Обране
storiesRouter.post(
  '/:storyId/favorite',
  isValidId('storyId'),
  authenticate,
  ctrl.addToFavorite,
);

storiesRouter.delete(
  '/:storyId/favorite',
  isValidId('storyId'),
  authenticate,
  ctrl.deleteFavorite,
);

export default storiesRouter;