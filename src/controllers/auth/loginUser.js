import createHttpError from 'http-errors';
import bcrypt from "bcrypt";

import { UserModel } from '../../models/user.js';
import { SessionModel } from '../../models/session.js';
import { createSession, setSessionCookies } from '../../services/auth/authService.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const normalizedEmail = email.trim().toLowerCase();

  const user = await UserModel.findOne({ email: normalizedEmail }).select("+password");
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

   await SessionModel.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};
