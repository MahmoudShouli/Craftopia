import axios from "axios";

const API_URL = "http://localhost:3000/notifications";

const fetchNotifications = async (email) => {
  const res = await axios.get(`${API_URL}/`, {
    params: { email },
  });
  return res.data;
};

const createNotification = async ({ email, text, linkTo }) => {
  const res = await axios.post(`${API_URL}/`, {
    email,
    text,
    linkTo,
  });
  return res.data;
};

export default {
  fetchNotifications,
  createNotification,
};
