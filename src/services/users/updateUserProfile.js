import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";

const EMAIL_IN_USE = "Користувач із таким email уже існує";

export const updateUserProfile = async (userId, { name, email }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const taken = await UserModel.exists({
    email: normalizedEmail,
    _id: { $ne: userId },
  });
  if (taken) throw createHttpError(409, EMAIL_IN_USE);

  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { name, email: normalizedEmail },
      { new: true }
    );
  } catch (error) {
    // The unique index may catch a race between the check and the update.
    if (error.code === 11000) throw createHttpError(409, EMAIL_IN_USE);
    throw error;
  }
};
