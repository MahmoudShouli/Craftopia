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
    readAt: {
      type: Date,
      default: null,
      index: true, // 👈 important
      expires: 60, // 5 seconds
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
