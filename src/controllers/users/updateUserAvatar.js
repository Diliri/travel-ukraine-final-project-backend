import createHttpError from "http-errors";
import { updateUserAvatar as updateAvatar } from "../../services/users/updateUserAvatar.js";

// PATCH /api/users/me/avatar  (multipart/form-data, поле "avatar")
export const updateUserAvatar = async (req, res) => {
  if (!req.file) throw createHttpError(400, "Avatar file is required");

  const user = await updateAvatar(req.user._id, req.file.buffer);
  res.status(200).json(user);
};
