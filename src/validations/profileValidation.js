import { Joi, Segments } from "celebrate";

// Загальна схема для валідації пагінації у списках
const pagination = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).max(100).default(10),
});

// Правила з Validation rules (auth form):
// name — max 32, required; email — email, max 64, required
export const updateProfileValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().max(32).required(),
    email: Joi.string().trim().lowercase().email().max(64).required(),
  }),
};

// Правила зміни пароля: min 8, max 128, новий повинен відрізнятися від поточного
export const updatePasswordValidation = {
  [Segments.BODY]: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .invalid(Joi.ref("currentPassword")) // новий пароль має відрізнятись від поточного
      .required(),
  }),
};

// Валідація отримання профілю конкретного мандрівника разом із його статтями + параметри пагінації
export const getProfileWithStoriesValidation = {
  [Segments.PARAMS]: Joi.object({
    travellerId: Joi.string().hex().length(24).required(),
  }),
  [Segments.QUERY]: pagination,
};

// Валідація параметрів для збережених історій за їхнім ID
export const savedStoryParamsValidation = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().hex().length(24).required(),
  }),
};

// Валідація для отримання загального списку профілів (з пагінацією)
export const getProfilesValidation = {
  [Segments.QUERY]: pagination,
};

// Валідація токена підтвердження електронної пошти
export const confirmEmailValidation = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
  }),
};
