import { Router } from "express";
import { categories as ctrl } from "../controllers/index.js";

const categoriesRouter = Router();
// CategoriesFilter and AddStoryForm use this public list
categoriesRouter.get("/", ctrl.getCategories);

export default categoriesRouter;
