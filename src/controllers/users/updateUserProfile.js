import { updateUserProfile as saveProfile } from "../../services/users/updateUserProfile.js";
// PATCH /api/users/me  { name, email }
export const updateUserProfile = async (req, res) => {
  res.json(await saveProfile(req.user._id, req.body));
};
