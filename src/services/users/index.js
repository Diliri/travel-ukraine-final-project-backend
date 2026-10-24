import { UserModel } from '../../models/user.js';
import mongoose from 'mongoose';

// Отримання списку всіх авторів (для слайдера на головній)
const getAllTravellers = async () => {
  return await UserModel.find({}, 'name avatarUrl articlesAmount');
};

// Отримання профілю конкретного автора разом із його статтями + ПАГІНАЦІЯ
const getTravellerById = async (travellerId, query = {}) => {
  const user = await UserModel.findById(travellerId, 'name avatarUrl articlesAmount');

  if (!user) return null;

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 6;
  const skip = (page - 1) * limit;

  let articles = [];
  let totalArticles = 0;

  try {
    const StoryModel = mongoose.model('story');

    totalArticles = await StoryModel.countDocuments({ owner: travellerId });

    articles = await StoryModel.find({ owner: travellerId })
      .skip(skip)
      .limit(limit);
  } catch (e) {
    articles = [];
  }

  return {
    profile: user,
    articles: articles,
    pagination: {
      total: totalArticles,
      page,
      limit,
      totalPages: Math.ceil(totalArticles / limit),
    },
  };
};

export default {
  getAllTravellers,
  getTravellerById,
};
