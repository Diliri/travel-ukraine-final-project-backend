import crypto from "node:crypto";
import { SessionModel } from "../../models/session.js";
import { FIFTEEN_MINUTES, ONE_DAY } from "../../constants/time.js";

export const createSession = async (userId) => {
  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();

  return SessionModel.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const setSessionCookies = (res, session) => {
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };

  res.cookie("accessToken", session.accessToken, {
    ...cookieOptions,
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie("refreshToken", session.refreshToken, {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });

  res.cookie("sessionId", session._id.toString(), {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });
};
