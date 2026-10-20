import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 32,
    },
    avatarUrl: {
      type: String,
      default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
    },
    articlesAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    savedArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: "story", 
      },
    ],
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  { 
    timestamps: true,
    versionKey: false 
  },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const UserModel = model("user", userSchema);