import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import authRouter from "./routes/authRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import storiesRouter from "./routes/storiesRouter.js";
import usersRouter from "./routes/usersRouter.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

dotenv.config();
const app = express();

app.use(logger);
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/stories", storiesRouter);
app.use("/api/categories", categoriesRouter);

// Middleware для обробки неіснуючих маршрутів (404)
app.use(notFoundHandler);
app.use(errors());
// Middleware для обробки помилок (500)
app.use(errorHandler);

await connectMongoDB();

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
