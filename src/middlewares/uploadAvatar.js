import { uploadImage } from "./uploadImage.js";

export const uploadAvatar = uploadImage("avatar");

// Файл тримаємо в памʼяті й одразу віддаємо в Cloudinary (на диск нічого не пишемо).
// LIMIT_FILE_SIZE (1 MB) вже обробляє errorHandler.
