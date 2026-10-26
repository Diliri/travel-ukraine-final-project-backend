import multer from "multer";
import createHttpError from "http-errors";

const ONE_MEGABYTE = 1024 * 1024;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: ONE_MEGABYTE,
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      return cb(createHttpError(415, "Only image files are allowed"));
    }

    cb(null, true);
  },
});
