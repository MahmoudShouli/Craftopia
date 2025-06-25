import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dw2tjwbdg",
  api_key: "658416436435244",
  api_secret: "ZE6a4qq-02YCUL20TxKYCUg9QJY",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webm", "mp3", "m4a"],
  },
});

export const upload = multer({ storage });
export { cloudinary };
