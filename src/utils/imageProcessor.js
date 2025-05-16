import { cloudinary } from "./cloudinaryConfig.js";
import { fileTypeFromBuffer } from "file-type";
import getColors from "get-image-colors";
import axios from "axios";
import streamifier from "streamifier";

export const uploadImage = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "craftopia/templates",
          quality: "auto:best",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error("❌ Error in loading", imageUrl, "-", error.message);
    return null; // Return null on failure to allow skipping
  }
};

export const getDominantColors = async (imageUrl) => {
  try {
    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");

    const type = await fileTypeFromBuffer(buffer);
    if (!type || !type.mime.startsWith("image/")) {
      console.warn("❌ Invalid image format:", imageUrl);
      return [];
    }

    const colors = await getColors(buffer, type.mime);
    return colors.map((c) => c.hex());
  } catch (err) {
    console.warn(
      "⚠️ Failed to extract colors from image:",
      imageUrl,
      "\nError:",
      err.message
    );
    return [];
  }
};
