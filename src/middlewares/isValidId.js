// це перевірка квері параметрів,
// а саме перевіряються ObjectId в параметрах до запиту в БД,
// тоді виходить 400. Використовувати так: isValidId('travellerId')
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId =
  (paramName = "id") =>
  (req, _res, next) => {
    if (!isValidObjectId(req.params[paramName])) {
      return next(createHttpError(400, `Invalid ${paramName}`));
    }
    next();
  };
