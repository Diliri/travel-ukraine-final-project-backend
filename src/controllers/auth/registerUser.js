import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";
import {
  createSession,
  setSessionCookies,
} from "../../services/auth/authService.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  if (await UserModel.exists({ email: normalizedEmail })) {
    const error = createHttpError(409, "Email already exists");
    error.code = "EMAIL_ALREADY_EXISTS";
    throw error;
  }

  const user = await UserModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, 10),
  });
  const session = await createSession(user._id);
  setSessionCookies(res, session);
  res.status(201).json({ user });
};
