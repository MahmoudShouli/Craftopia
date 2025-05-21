import NotificationRepository from "../repositories/NotificationRepository.js";

const fetchNotificationsByEmail = async (email) => {
  return await NotificationRepository.getNotificationsByUserEmail(email);
};

const createNotification = async (data) => {
  return await NotificationRepository.createNotification(data);
};

export default {
  fetchNotificationsByEmail,
  createNotification,
};
