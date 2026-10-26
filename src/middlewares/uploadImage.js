import createHttpError from "http-errors";
import multer from "multer";

const MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE = 1024 * 1024;

export const uploadImage = (field) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_IMAGE_SIZE },
    fileFilter: (_req, file, callback) => {
      if (!MIME_TYPES.has(file.mimetype)) {
        return callback(
          createHttpError(400, "Дозволені формати: JPG, PNG, WEBP")
        );
      }
      callback(null, true);
    },
  }).single(field);
