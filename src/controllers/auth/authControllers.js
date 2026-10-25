import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UserModel } from '../../models/user.js';
import { SessionModel } from '../../models/session.js';
import { createSession, setSessionCookies } from '../../services/auth/authService.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await UserModel.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = createHttpError(409, 'Email in use');
    error.code = 'EMAIL_ALREADY_EXISTS';
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  const session = await createSession(newUser._id);
  setSessionCookies(res, session);

  res.status(201).json({ user: newUser });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const normalizedEmail = email.trim().toLowerCase();

  const user = await UserModel.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await SessionModel.deleteOne({ userId: user._id });
  const session = await createSession(user._id);
  setSessionCookies(res, session);

  // Don't send password
  const userResponse = user.toJSON();
  res.json(userResponse);
};

export const refreshUserSession = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const session = await SessionModel.findOne({ _id: sessionId, refreshToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await SessionModel.deleteOne({ _id: session._id });
    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    throw createHttpError(401, 'Session token expired');
  }

  await SessionModel.deleteOne({ userId: session.userId });
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.json({ message: 'Session refreshed' });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await SessionModel.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const getMe = async (req, res) => {
  res.json(req.user);
};

export const checkSession = async (req, res) => {
  res.status(200).json({ success: true });
};
