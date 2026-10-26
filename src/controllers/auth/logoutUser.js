import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { SessionModel } from "../../models/session.js";
import {
  clearSessionCookies,
  createSession,
  setSessionCookies,
} from "../../services/auth/authService.js";

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId && isValidObjectId(sessionId)) {
    await SessionModel.deleteOne({ _id: sessionId });
  }
  clearSessionCookies(res);
  res.status(204).send();
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  if (!sessionId || !refreshToken || !isValidObjectId(sessionId)) {
    throw createHttpError(401, "Missing or invalid session credentials");
  }

  const session = await SessionModel.findOne({ _id: sessionId, refreshToken });
  if (!session) throw createHttpError(401, "Session not found");

  if (session.refreshTokenValidUntil <= new Date()) {
    await session.deleteOne();
    clearSessionCookies(res);
    throw createHttpError(401, "Session token expired");
  }

  await session.deleteOne();
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);
  res.status(200).json({ message: "Session refreshed" });
};
