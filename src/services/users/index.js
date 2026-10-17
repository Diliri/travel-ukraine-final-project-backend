import { UserModel } from "../../models/user.js";
import mongoose from "mongoose";


const getAllTravellers = async () => {
  return await UserModel.find({}, "name avatarUrl articlesAmount");
};


const getTravellerById = async (travellerId) => {
  
  const user = await UserModel.findById(travellerId, "name avatarUrl articlesAmount");
  
  if (!user) return null;

  
  let articles = [];
  try {
    articles = await mongoose.model("article").find({ owner: travellerId });
  } catch (e) {
    articles = [];
  }

  
  return {
    profile: user,
    articles: articles
  };
};

export default {
  getAllTravellers,
  getTravellerById,
};