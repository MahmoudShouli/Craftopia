import NotificationService from "../services/NotificationService.js";

export const getNotifications = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const notifications = await NotificationService.fetchNotificationsByEmail(
      email
    );
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const postNotification = async (req, res) => {
  try {
    const { email, text, linkTo } = req.body;
    if (!email || !text) {
      return res.status(400).json({ error: "Email and text are required" });
    }

    const created = await NotificationService.createNotification({
      email,
      text,
      linkTo,
    });
    res.status(201).json(created);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Failed to create notification" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await NotificationService.updateNotificationStatus(id);
    if (!updated) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
};
