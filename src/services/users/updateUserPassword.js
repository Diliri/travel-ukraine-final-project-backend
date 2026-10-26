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
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw createHttpError(400, "Поточний пароль невірний");
  }
  await UserModel.updateOne(
    { _id: userId },
    { password: await bcrypt.hash(newPassword, 10) }
  );
};
