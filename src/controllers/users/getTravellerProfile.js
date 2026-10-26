import createHttpError from "http-errors";
import usersServices from "../../services/users/index.js";

export const getTravellerProfile = async (req, res) => {
  const { travellerId } = req.params;
  const profile = await usersServices.getTravellerById(travellerId, req.query);
  if (!profile)
    throw createHttpError(404, `Traveller ${travellerId} not found`);
  res.json(profile);
};
