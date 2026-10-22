import { CategoryModel } from "../../models/category.js";

export const getCategories = async (req, res) => {
  const categories = await CategoryModel.find();

  res.json(categories);
};
