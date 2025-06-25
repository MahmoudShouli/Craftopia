import express from "express";
import {
  getNotifications,
  postNotification,
  markAsRead,
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/", getNotifications); // GET /notifications?email=...
notificationRouter.post("/", postNotification);
notificationRouter.patch("/:id/read", markAsRead);
export default notificationRouter;
