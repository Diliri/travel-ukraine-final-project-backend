import multer from "multer";
import createHttpError from "http-errors";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Файл тримаємо в памʼяті й одразу віддаємо в Cloudinary (на диск нічого не пишемо).
// LIMIT_FILE_SIZE (1 MB) вже обробляє errorHandler.
export const uploadAvatar = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(createHttpError(400, "Allowed formats: JPG, PNG, WEBP"));
    }
    cb(null, true);
  },
}).single("avatar");
