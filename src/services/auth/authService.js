import { randomUUID } from "node:crypto";
import { FIFTEEN_MINUTES, ONE_DAY } from "../../constants/time.js";
import { SessionModel } from "../../models/session.js";

const COOKIE_NAMES = ["sessionId", "accessToken", "refreshToken"];

const cookieOptions = () => {
  const production = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: production,
    sameSite: production ? "none" : "lax",
  };
};

export const createSession = (userId) =>
  SessionModel.create({
    userId,
    accessToken: randomUUID(),
    refreshToken: randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

export const setSessionCookies = (res, session) => {
  const options = cookieOptions();
  res.cookie("accessToken", session.accessToken, {
    ...options,
    maxAge: FIFTEEN_MINUTES,
  });
  res.cookie("refreshToken", session.refreshToken, {
    ...options,
    maxAge: ONE_DAY,
  });
  res.cookie("sessionId", String(session._id), {
    ...options,
    maxAge: ONE_DAY,
  });
};

export const clearSessionCookies = (res) => {
  const options = cookieOptions();
  for (const name of COOKIE_NAMES) res.clearCookie(name, options);
};
