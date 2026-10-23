import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";

const EMAIL_IN_USE = "Користувач із таким email уже існує";

export const updateUserProfile = async (userId, { name, email }) => {
  const taken = await UserModel.findOne({ email, _id: { $ne: userId } });
  if (taken) throw createHttpError(409, EMAIL_IN_USE);

  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
  } catch (error) {
    // гонка запитів: унікальний індекс спрацював раніше за перевірку
    if (error.code === 11000) throw createHttpError(409, EMAIL_IN_USE);
    throw error;
  }
};
