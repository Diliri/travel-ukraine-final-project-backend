import { StoryModel } from "../../models/story.js";
import { UserModel } from "../../models/user.js";
import { getPagination, paginationMeta } from "../../utils/pagination.js";

// Отримання списку всіх авторів (для слайдера на головній) з пагінацією та актуальним підрахунком статей
const getAllTravellers = async (query = {}) => {
  // 1. Налаштовуємо пагінацію з параметрів запиту (query) через загальну утиліту
  const { page, perPage, skip } = getPagination(query);

  // 2. Паралельно отримуємо сторінку користувачів та загальну кількість для пагінації
  const [users, totalItems] = await Promise.all([
    UserModel.find({}, "name avatarUrl articlesAmount")
      .sort({ _id: 1 })
      .skip(skip)
      .limit(perPage)
      .lean(),
    UserModel.countDocuments({}),
  ]);

  // 3. Рахуємо актуальну кількість статей для отриманих авторів через агрегацію
  const counts = await StoryModel.aggregate([
    { $match: { ownerId: { $in: users.map((user) => user._id) } } },
    { $group: { _id: "$ownerId", count: { $sum: 1 } } },
  ]);

  const byId = new Map(counts.map(({ _id, count }) => [String(_id), count]));

  // 4. Формуємо список мандрівників із оновленою кількістю статей
  const travellers = users.map((user) => ({
    ...user,
    articlesAmount: byId.get(String(user._id)) ?? 0,
  }));

  // Повертаємо комбінований об'єкт із мандрівниками та мета-даними пагінації
  return {
    travellers,
    pagination: paginationMeta(totalItems, page, perPage),
  };
};

// Отримання профілю конкретного автора разом із його статтями + ПАГІНАЦІЯ
const getTravellerById = async (travellerId, query = {}) => {
  // 1. Шукаємо самого користувача в базі (використовуємо .lean() для оптимізації)
  const user = await UserModel.findById(
    travellerId,
    "name avatarUrl articlesAmount"
  ).lean();

  if (!user) return null;

  // 2. Налаштовуємо пагінацію для його статей з параметрів запиту (query)
  const { page, perPage, skip } = getPagination(query);
  const filter = { ownerId: travellerId };

  let articles = [];
  let totalItems = 0;

  try {
    // 3. Паралельно забираємо потрібну порцію статей та рахуємо їх загальну кількість
    [articles, totalItems] = await Promise.all([
      StoryModel.find(filter)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(perPage)
        .lean(),
      StoryModel.countDocuments(filter),
    ]);
  } catch (e) {
    // Якщо сталася помилка (наприклад, модель статей ще не створена), повертаємо порожні дані
    articles = [];
  }

  // Повертаємо комбінований об'єкт із профільними даними, статтями та мета-даними пагінації
  return {
    profile: { ...user, articlesAmount: totalItems },
    articles,
    pagination: paginationMeta(totalItems, page, perPage),
  };
};

export default {
  getAllTravellers,
  getTravellerById,
};
