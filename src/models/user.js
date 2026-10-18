import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  avatarUrl: { type: String, default: "" },
  articlesAmount: { type: Number, default: 0, min: 0 },
  savedArticles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // поле password за замовчуванням не буде включатися до результатів запитів до бази даних
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
// використовуємо практику «захист у кілька шарів» або Defense-in-Depth

export const UserModel = model("user", userSchema);
