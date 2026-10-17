import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    // Счетчик собственных статей 
    articlesAmount: {
      type: Number,
      default: 0,
    },
    // Массив сохраненных статей других пользователей для Mongoose populate
    savedArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: "article", // Имя модели статей, которое будет использоваться в проекте
        default: [],
      },
    ],
  },
  { 
    timestamps: true, 
    versionKey: false 
  }
);

export const UserModel = model("user", userSchema);