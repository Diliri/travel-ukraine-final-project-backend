import createError from "http-errors";

const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = messageList[status]) => {
  // Используем библиотеку http-errors, которую ждет errorHandler тимлида
  return createError(status, message);
};

export default HttpError;