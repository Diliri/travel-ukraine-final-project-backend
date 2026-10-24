import { model, Schema } from 'mongoose';
import { handleMongooseError, setUpdateOptions } from './hooks.js';
import { AVATAR_URL } from '../constants/user.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: AVATAR_URL,
    },
    articlesAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    storiesCount: {
      type: Number,
      default: 0,
    },
    savedArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'story',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.post('save', handleMongooseError);
userSchema.pre('findOneAndUpdate', setUpdateOptions); //Mongoose middleware (хук) на схемі користувача.
userSchema.post('findOneAndUpdate', handleMongooseError);

export const UserModel = model('user', userSchema);
