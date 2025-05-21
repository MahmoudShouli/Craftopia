import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    linkTo: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema,
  "notifications"
);

export default NotificationModel;
