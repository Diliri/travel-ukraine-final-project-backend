import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { SessionModel } from "../../models/session.js";
import { UserModel } from "../../models/user.js";
import {
  createSession,
  setSessionCookies,
} from "../../services/auth/authService.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, "Invalid credentials");
  }

  await SessionModel.deleteOne({ userId: user._id });
  const session = await createSession(user._id);
  setSessionCookies(res, session);
  res.status(200).json(user);
};
