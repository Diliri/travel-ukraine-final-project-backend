import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";

export const updateUserProfile = async (userId, { name, email }) => {
  const taken = await UserModel.findOne({ email, _id: { $ne: userId } });
  if (taken) throw createHttpError(409, "Email in use");

  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
  } catch (error) {
    // гонка запитів: унікальний індекс спрацював раніше за перевірку
    if (error.code === 11000) throw createHttpError(409, "Email in use");
    throw error;
  }
};
