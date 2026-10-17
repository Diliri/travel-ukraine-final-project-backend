import { UserModel } from "../../models/user.js";

// Сервис для получения списка всех авторов
const getAllTravellers = async () => {
  // Возвращаем всех пользователей, но берем только нужные для слайдера поля:
  // имя, аватарку и количество статей
  return await UserModel.find({}, "name avatarUrl storiesCount");
};

// Сервис для получения профиля конкретного автора по его ID
const getTravellerById = async (travellerId) => {
  // Ищем в базе пользователя по его уникальному _id
  return await UserModel.findById(travellerId, "name avatarUrl storiesCount");
};

export default {
  getAllTravellers,
  getTravellerById,
};