import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { errors } from "celebrate";
import { connectMongoDB } from "./db/connectMongoDB.js";
import authRouter from "./routes/authRoutes.js";
import storiesRouter from "./routes/storiesRouter.js";
import usersRouter from "./routes/usersRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Стандартні Middleware
app.use(helmet());
app.use(cors()); // кросдоменні http-запити
app.use(express.json());
app.use(cookieParser());

// Логер HTTP-запитів
app.use(logger);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/stories", storiesRouter);

// Middleware для обробки неіснуючих маршрутів (404)
app.use(notFoundHandler);

app.use(errors());

// Middleware для обробки помилок (500)
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
