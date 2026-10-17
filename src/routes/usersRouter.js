import { Router } from "express";
import { users } from "../controllers/index.js"; 

const usersRouter = Router();

// Получить список всех путешественников (авторов)
usersRouter.get("/", users.getTravellers);

// Получить публичный профиль конкретного автора по ID
usersRouter.get("/:travellerId", users.getTravellerProfile);

export default usersRouter;