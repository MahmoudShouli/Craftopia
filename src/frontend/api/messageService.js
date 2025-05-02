import axios from "axios";

const API_URL = "http://localhost:3000";

export const getChatMessages = async (sender, receiver) => {
  try {
    const response = await axios.get(`${API_URL}/messages/getChat`, {
      params: { sender, receiver },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch chat messages:", err);
    throw err;
  }
};

export const sendMessage = async ({ sender, receiver, content }) => {
  try {
    const response = await axios.post(`${API_URL}/addMessage`, {
      sender,
      receiver,
      content,
    });
    return response.data;
  } catch (err) {
    console.error("Failed to send message:", err);
    throw err;
  }
};
