import { updateUserProfile as updateProfile } from "../../services/users/updateUserProfile.js";

// PATCH /api/users/me  { name, email }
export const updateUserProfile = async (req, res) => {
  const user = await updateProfile(req.user._id, req.body);
  res.status(200).json(user);
};
