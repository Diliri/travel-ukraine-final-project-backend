import createHttpError from "http-errors";
import { updateUserAvatar as saveAvatar } from "../../services/users/updateUserAvatar.js";

export const updateUserAvatar = async (req, res) => {
  if (!req.file) throw createHttpError(400, "Файл аватара не передано");
  res.json(await saveAvatar(req.user._id, req.file.buffer));
};
