import createHttpError from 'http-errors';
import { SessionModel } from '../models/session.js';
import { UserModel } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if (!sessionId || !accessToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const session = await SessionModel.findOne({
    _id: sessionId,
    accessToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired = session.accessTokenValidUntil < new Date();

  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await UserModel.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;
  next();
};
