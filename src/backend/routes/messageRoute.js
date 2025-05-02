import express from "express";
import { getChat } from "../controllers/messageController.js";
import { addMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/getChat", getChat);
messageRouter.post("/addMessage", addMessage);

export default messageRouter;