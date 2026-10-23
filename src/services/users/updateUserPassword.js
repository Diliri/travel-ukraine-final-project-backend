import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";

export const updateUserPassword = async (
  userId,
  { currentPassword, newPassword }
) => {
  // password має select: false, тому просимо його явно
  const user = await UserModel.findById(userId).select("+password");
  if (!user) throw createHttpError(401, "Необхідно увійти в систему");

  const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentValid) throw createHttpError(400, "Поточний пароль невірний");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await UserModel.updateOne({ _id: userId }, { password: hashedPassword });
};
