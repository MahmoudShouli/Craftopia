import express from "express";
import {
  getNotifications,
  postNotification,
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/", getNotifications); // GET /notifications?email=...
notificationRouter.post("/", postNotification);

export default notificationRouter;
