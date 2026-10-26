import usersServices from "../../services/users/index.js";

export const getTravellers = async (req, res) => {
  res.json(await usersServices.getAllTravellers(req.query));
};
