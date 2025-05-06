import MessageRepository from "../repositories/MessageRepository.js";
import {
  getChattedWith,
  addToChattedWith,
} from "../repositories/UserRepository.js";

const getChatMessages = async (sender, receiver) => {
  return await MessageRepository.getChat(sender, receiver);
};

const sendMessage = async (messageData) => {
  return await MessageRepository.addMessage(messageData);
};

const getContacts = async (userEmail) => {
  return await getChattedWith(userEmail);
};

const recordChat = async (userEmail, crafterEmail) => {
  await addToChattedWith(userEmail, crafterEmail);
  await addToChattedWith(crafterEmail, userEmail);
};

export default {
  getChatMessages,
  sendMessage,
  getContacts,
  recordChat,
};
