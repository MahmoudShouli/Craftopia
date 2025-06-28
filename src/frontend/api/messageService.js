import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/messages`;

const getChatMessages = async (sender, receiver) => {
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

const sendMessage = async ({ sender, receiver, content }) => {
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

const getContacts = async (userEmail) => {
  try {
    const response = await axios.get(`${API_URL}/get-contacts`, {
      params: { userEmail },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch chatted-with list:", err);
    throw err;
  }
};

const likeMessage = async (messageId) => {
  const response = await axios.put(`${API_URL}/like/${messageId}`);
  return response.data.message;
};

const deleteMessage = async (messageId) => {
  const response = await axios.delete(`${API_URL}/delete/${messageId}`);
  return response.data.deleted;
};

const messageService = {
  getChatMessages,
  sendMessage,
  getContacts,
  likeMessage,
  deleteMessage,
};

export default messageService;
