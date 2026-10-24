import { updateUserPassword as updatePassword } from "../../services/users/updateUserPassword.js";

// PATCH /api/users/me/password  { currentPassword, newPassword }
export const updateUserPassword = async (req, res) => {
  await updatePassword(req.user._id, req.body);
  res.status(200).json({ message: "Пароль успішно змінено" });
};
