import { v2 as cloudinary } from "cloudinary";
import { Readable } from "node:stream";
import { UserModel } from "../../models/user.js";

// Якщо Тімлід вже зробив спільну cloudinary-утиліту — заміни uploadToCloudinary на неї.
// Потрібні змінні в .env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, userId) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "travel-ukraine/avatars",
        public_id: String(userId), // один аватар на користувача — старий перезаписується
        overwrite: true,
        resource_type: "image",
        transformation: [{ width: 256, height: 256, crop: "fill", gravity: "face" }],
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    Readable.from(buffer).pipe(stream);
  });

export const updateUserAvatar = async (userId, fileBuffer) => {
  const { secure_url } = await uploadToCloudinary(fileBuffer, userId);
  return UserModel.findByIdAndUpdate(
    userId,
    { avatarUrl: secure_url },
    { new: true }
  );
};
