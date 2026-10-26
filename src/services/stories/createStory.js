import createHttpError from "http-errors";
import { CategoryModel } from "../../models/category.js";
import { StoryModel } from "../../models/story.js";
import { saveStoryImageToCloudinary } from "../../utils/saveFileToCloudinary.js";

export const createStory = async ({ title, article, category, file, user }) => {
  if (!(await CategoryModel.exists({ _id: category }))) {
    throw createHttpError(404, "Category not found");
  }
  const image = await saveStoryImageToCloudinary(file.buffer);
  return StoryModel.create({
    title,
    article,
    category,
    img: image.secure_url,
    desc: article.slice(0, 200),
    ownerId: user._id,
    author: user.name,
    date: new Date().toISOString().slice(0, 10),
  });
};
