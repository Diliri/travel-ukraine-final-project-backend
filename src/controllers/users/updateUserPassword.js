import { updateUserPassword as savePassword } from "../../services/users/updateUserPassword.js";
// PATCH /api/users/me/password  { currentPassword, newPassword }
export const updateUserPassword = async (req, res) => {
  await savePassword(req.user._id, req.body);
  res.json({ message: "Пароль успішно змінено" });
};
