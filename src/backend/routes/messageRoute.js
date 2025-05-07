import express from "express";
import { getChat } from "../controllers/messageController.js";
import { addMessage } from "../controllers/messageController.js";
import { getContacts } from "../controllers/messageController.js";
import { cloudinaryImageUpload } from "../controllers/messageController.js";
import { cloudinaryAudioUpload } from "../controllers/messageController.js";
import { toggleLikeMessage } from "../controllers/messageController.js";
import { deleteMessage } from "../controllers/messageController.js";

import { upload } from "../../utils/cloudinaryConfig.js";

const messageRouter = express.Router();

messageRouter.get("/get-chat", getChat);
messageRouter.post("/add-message", addMessage);
messageRouter.get("/get-contacts", getContacts);
messageRouter.put("/like/:messageId", toggleLikeMessage);
messageRouter.delete("/delete/:messageId", deleteMessage);

messageRouter.post(
  "/upload-image",
  upload.single("image"),
  cloudinaryImageUpload
);

messageRouter.post(
  "/upload-audio",
  upload.single("audio"),
  cloudinaryAudioUpload
);

export default messageRouter;
