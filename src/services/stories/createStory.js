import createHttpError from "http-errors";
import { CategoryModel } from "../../models/category.js";
import { StoryModel } from "../../models/story.js";
import { UserModel } from "../../models/user.js";
import {
  deleteStoryImageFromCloudinary,
  saveStoryImageToCloudinary,
} from "../../utils/saveFileToCloudinary.js";
import { buildStoryDescription } from "../../utils/story.js";

export const createStory = async ({ user, file, payload }) => {
  if (!file?.buffer) {
    throw createHttpError(400, "Story image is required");
  }

  const categoryExists = await CategoryModel.exists({ _id: payload.category });
  if (!categoryExists) {
    throw createHttpError(404, "Category not found");
  }

  const uploadedImage = await saveStoryImageToCloudinary(file.buffer);
  let story;

  try {
    story = await StoryModel.create({
      img: uploadedImage.secure_url,
      title: payload.title,
      desc: buildStoryDescription(payload.article),
      article: payload.article,
      category: payload.category,
      ownerId: user._id,
      date: new Date().toISOString(),
      author: user.name,
    });

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
      $inc: { articlesAmount: 1, storiesCount: 1 },
    });

    if (!updatedUser) {
      throw createHttpError(401, "User not found");
    }
  } catch (error) {
    if (story?._id) {
      await StoryModel.findByIdAndDelete(story._id).catch(() => undefined);
    }
    await deleteStoryImageFromCloudinary(uploadedImage.public_id).catch(
      () => undefined,
    );
    throw error;
  }

  return StoryModel.findById(story._id)
    .populate("ownerId", "name avatarUrl")
    .populate("category", "category");
};
