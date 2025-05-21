import NotificationModel from "../models/NotificationModel.js";
import UserModel from "../models/UserModel.js";

const getNotificationsByUserEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) return [];
  return await NotificationModel.find({ user: user._id }).sort({
    createdAt: -1,
  });
};

const createNotification = async ({ email, text, linkTo }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  const notification = new NotificationModel({
    text,
    linkTo,
    user: user._id,
  });

  return await notification.save();
};

const markNotificationAsRead = async (id) => {
  return await NotificationModel.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
};

export default {
  getNotificationsByUserEmail,
  createNotification,
  markNotificationAsRead,
};
