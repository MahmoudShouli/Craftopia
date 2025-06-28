import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/notifications`;

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

const markNotificationAsRead = async (id) => {
  const res = await axios.patch(`${API_URL}/${id}/read`);
  return res.data;
};

export default {
  fetchNotifications,
  createNotification,
  markNotificationAsRead,
};
