import axios from "axios";

const API_URL = "http://localhost:3000/messages";

export const getChatMessages = async (sender, receiver) => {
  try {
    const response = await axios.get(`${API_URL}/get-chat`, {
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
    const response = await axios.post(`${API_URL}/add-message`, {
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

export const getCraftersChattedWith = async (userEmail) => {
  try {
    const response = await axios.get(`${API_URL}/get-contacted-crafters`, {
      params: { userEmail },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch chatted-with list:", err);
    throw err;
  }
};

const messageService = {
  getChatMessages,
  sendMessage,
  getCraftersChattedWith,
};

export default messageService;
