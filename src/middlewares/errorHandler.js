import { isCelebrateError } from "celebrate";
import { isHttpError } from "http-errors";
import multer from "multer";

const messages = {
  uk: {
    validation: "Перевірте правильність заповнення полів",
    required: "Це поле обов'язкове",
    email: "Введіть коректну адресу електронної пошти",
    min: "Значення закоротке",
    max: "Значення задовге",
    invalid: "Некоректне значення",
    fileTooLarge: "Файл завеликий (максимум 1 МБ)",
    invalidFile: "Не вдалося обробити файл",
    duplicateEmail: "Користувач із таким email уже існує",
    unauthorized: "Необхідно увійти в систему",
    forbidden: "У вас немає дозволу на цю дію",
    notFound: "Ресурс не знайдено",
    badRequest: "Некоректний запит",
    internal: "Сталася внутрішня помилка сервера",
    conflict: "Конфлікт даних. Перевірте запит",
  },
  en: {
    validation: "Please check the submitted fields",
    required: "This field is required",
    email: "Enter a valid email address",
    min: "The value is too short",
    max: "The value is too long",
    invalid: "Invalid value",
    fileTooLarge: "File is too large (maximum 1 MB)",
    invalidFile: "The file could not be processed",
    duplicateEmail: "A user with this email already exists",
    unauthorized: "Please sign in to continue",
    forbidden: "You are not allowed to perform this action",
    notFound: "Resource not found",
    badRequest: "Invalid request",
    internal: "An internal server error occurred",
    conflict: "A data conflict occurred. Please check your request",
  },
};

const getLanguage = (req) => {
  const language = req
    .get("Accept-Language")
    ?.split(",")[0]
    ?.trim()
    .toLowerCase();

  if (language?.startsWith("en")) return "en";
  return "uk";
};

const getValidationMessage = (error, language) => {
  const text = messages[language];
  const type = error.type;

  if (type === "any.required") return text.required;
  if (type === "string.email") return text.email;
  if (type?.endsWith(".min")) return text.min;
  if (type?.endsWith(".max")) return text.max;

  return text.invalid;
};

const getHttpMessage = (status, language) => {
  const text = messages[language];

  if (status === 400) return text.badRequest;
  if (status === 401) return text.unauthorized;
  if (status === 403) return text.forbidden;
  if (status === 404) return text.notFound;
  if (status === 409) return text.conflict;

  return text.internal;
};

const isDuplicateEmailError = (err) => {
  if (err?.code !== 11000) return false;

  const keyPattern = err.keyPattern ?? {};
  const keyValue = err.keyValue ?? {};

  return Boolean(keyPattern.email || keyValue.email);
};

export const errorHandler = (err, req, res, _next) => {
  const language = getLanguage(req);
  const text = messages[language];

  if (isCelebrateError(err)) {
    const details = [...err.details.values()];
    const message = details.length
      ? getValidationMessage(details[0].details[0], language)
      : text.validation;

    return res.status(400).json({ status: 400, message });
  }

  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE" ? text.fileTooLarge : text.invalidFile;

    return res.status(400).json({ status: 400, message });
  }

  if (isDuplicateEmailError(err)) {
    return res.status(409).json({
      status: 409,
      message: text.duplicateEmail,
    });
  }

  if (err.name === "CastError") {
    return res.status(404).json({
      status: 404,
      message: text.notFound,
    });
  }

  if (isHttpError(err)) {
    const status = err.status;

    const message =
      err.code === "EMAIL_ALREADY_EXISTS"
        ? text.duplicateEmail
        : err.message || getHttpMessage(status, language);

    if (status >= 500) {
      req.log?.error(err);
    }

    return res.status(status).json({ status, message });
  }

  req.log?.error(err);
  return res.status(500).json({
    status: 500,
    message: text.internal,
  });
};
