## Стек
Node.js 22+, Express 5, Mongoose/MongoDB, Joi/celebrate, cookie-сесії, Cloudinary, Multer.

## Локальний запуск

1. Перейдіть у каталог проєкту: `cd travel-ukraine-backend-fixed`.
2. Виконайте `npm ci` у середовищі з доступом до npm registry.
3. Створіть `.env` на основі `.env.example`, заповнивши щонайменше `MONGO_URL`, `FRONTEND_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `PORT`.
4. Запустіть `npm run dev`.
5. Виконайте `npm test` (локальні модульні тести пагінації).

`.env` із секретами ніколи не комітьте до репозиторію. У файлі прикладу паролі та ключі не повинні бути справжніми.

## API

Детальний перелік маршрутів, приклади і формати — у `API_CONTRACT_UK.md`. **Важливо:** частина ендпоінтів, яка раніше віддавала масиви, тепер повертає списки з пагінацією. Фронтенд необхідно узгодити з цією зміною перед merge.

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`, `GET /api/auth/me`, `GET /api/auth/session`.
- Users: `GET /api/users`, `GET /api/users/me`, `GET /api/users/:travellerId`, `GET /api/users/me/stories`, `GET /api/users/me/saved-stories`; `POST|DELETE /api/users/saved-stories/:storyId`, `PATCH /api/users/me`, `PATCH /api/users/me/avatar`, `PATCH /api/users/me/password`.
- Stories: `GET /api/stories`, `GET /api/stories/popular`, `GET /api/stories/:storyId`, `GET /api/stories/:storyId/recommended`, `POST /api/stories`, `POST|DELETE /api/stories/:storyId/favorite`.
- Categories: `GET /api/categories`.

Cookies: усі запити з браузера до захищених маршрутів слід виконувати з `credentials: "include"` (`withCredentials: true` для Axios).

## Безпека
Не використовуйте реальні продакшн-ключі на локальному сервері. Завантаження файлів обмежене до 1 МБ (перевірка MIME-заголовка), але для production потрібно додати перевірку вмісту файлів і політику захисту від CSRF.
