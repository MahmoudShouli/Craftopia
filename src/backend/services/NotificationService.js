import NotificationRepository from "../repositories/NotificationRepository.js";

const fetchNotificationsByEmail = async (email) => {
  return await NotificationRepository.getNotificationsByUserEmail(email);
};

const createNotification = async (data) => {
  return await NotificationRepository.createNotification(data);
};

const updateNotificationStatus = async (id) => {
  return await NotificationRepository.markNotificationAsRead(id);
};

export default {
  fetchNotificationsByEmail,
  createNotification,
  updateNotificationStatus,
};
