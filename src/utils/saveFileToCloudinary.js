import { v2 as cloudinary } from "cloudinary";

const uploadImage = (buffer, options) => {
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, image) => {
        if (error) reject(error);
        else resolve(image);
      }
    );
    stream.end(buffer);
  });
};

// Keep existing avatar storage settings for backward compatibility.
export const saveAvatarToCloudinary = (buffer, userId) =>
  uploadImage(buffer, {
    folder: "travel-ukraine/avatars",
    public_id: String(userId),
    overwrite: true,
    resource_type: "image",
    transformation: [
      { width: 256, height: 256, crop: "fill", gravity: "face" },
    ],
  });

export const saveStoryImageToCloudinary = (buffer) =>
  uploadImage(buffer, {
    folder: "travel-ukraine-final-project-backend/stories",
    resource_type: "image",
    transformation: [
      { width: 1200, crop: "limit" },
      { fetch_format: "auto", quality: "auto" },
    ],
  });
