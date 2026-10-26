import { getCurrentUser } from "../users/getCurrentUser.js";

export const getMe = getCurrentUser;
export const checkSession = (_req, res) => res.json({ success: true });
