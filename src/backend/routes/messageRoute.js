import express from "express";
import { getChat } from "../controllers/messageController.js";
import { addMessage } from "../controllers/messageController.js";
import { getCraftersChattedWith } from "../controllers/messageController.js";
import { cloudinaryImageUpload } from "../controllers/messageController.js";

import { upload } from "../../utils/cloudinaryConfig.js";

const messageRouter = express.Router();

messageRouter.get("/get-chat", getChat);
messageRouter.post("/add-message", addMessage);
messageRouter.get("/get-contacted-crafters", getCraftersChattedWith);
messageRouter.post(
  "/upload-image",
  upload.single("image"),
  cloudinaryImageUpload
);

export default messageRouter;
