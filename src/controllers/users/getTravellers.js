import usersServices from "../../services/users/index.js";

export const getTravellers = async (req, res, next) => {
  try {
    const result = await usersServices.getAllTravellers();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};