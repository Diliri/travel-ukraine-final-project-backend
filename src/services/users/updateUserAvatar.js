import { UserModel } from "../../models/user.js";
import { saveAvatarToCloudinary } from "../../utils/saveFileToCloudinary.js";

export const updateUserAvatar = async (userId, buffer) => {
  const image = await saveAvatarToCloudinary(buffer, userId);
  return UserModel.findByIdAndUpdate(
    userId,
    { avatarUrl: image.secure_url },
    { new: true }
  );
};
