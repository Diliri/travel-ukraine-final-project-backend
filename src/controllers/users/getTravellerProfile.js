import usersServices from "../../services/users/index.js";
import HttpError from "../../utils/HttpError.js"; // У тимлида обычно экспорт default, убрали фигурные скобки

export const getTravellerProfile = async (req, res, next) => {
  try {
    const { travellerId } = req.params;
    const result = await usersServices.getTravellerById(travellerId, req.query);

    if (!result) {
      throw HttpError(404, `Traveller with ID ${travellerId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};