import { UserModel } from "../../models/user.js";
import mongoose from "mongoose";

// Отримання списку всіх авторів (для слайдера на головній)
const getAllTravellers = async () => {
  return await UserModel.find({}, "name avatarUrl articlesAmount");
};

// Отримання профілю конкретного автора разом із його статтями + ПАГІНАЦІЯ
const getTravellerById = async (travellerId, query = {}) => {
  // 1. Шукаємо самого користувача в базі
  const user = await UserModel.findById(travellerId, "name avatarUrl articlesAmount");
  
  if (!user) return null;

  // 2. Налаштовуємо пагінацію для його статей з параметрів запиту (query)
  const page = parseInt(query.page) || 1;   // Номер сторінки (дефолт: 1)
  const limit = parseInt(query.limit) || 6; // Кількість статей на сторінку (дефолт: 6)
  const skip = (page - 1) * limit;          // Скільки статей пропустити

  let articles = [];
  let totalArticles = 0;

  try {
    const ArticleModel = mongoose.model("story");
    
    // Рахуємо загальну кількість статей цього автора для фронтенд-пагінації
    totalArticles = await ArticleModel.countDocuments({ owner: travellerId });

    // Забираємо потрібну порцію статей (застосовуємо skip та limit)
    articles = await ArticleModel.find({ owner: travellerId })
      .skip(skip)
      .limit(limit);
  } catch (e) {
    // Якщо модель статей ще не створена колегою, повертаємо порожні дані
    articles = [];
  }

  // Повертаємо комбінований об'єкт із мета-даними пагінації
  return {
    profile: user,
    articles: articles,
    pagination: {
      total: totalArticles,
      page,
      limit,
      totalPages: Math.ceil(totalArticles / limit)
    }
  };
};

export default {
  getAllTravellers,
  getTravellerById,
};