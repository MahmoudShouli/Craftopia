import MessageRepository from "../repositories/MessageRepository.js";
import {
  getChattedWith,
  addCrafterToChattedWith,
} from "../repositories/UserRepository.js";

const getChatMessages = async (sender, receiver) => {
  return await MessageRepository.getChat(sender, receiver);
};

const sendMessage = async (messageData) => {
  return await MessageRepository.addMessage(messageData);
};

const getCraftersChattedWith = async (userEmail) => {
  return await getChattedWith(userEmail);
};

const recordCrafterChat = async (userEmail, crafterEmail) => {
  await addCrafterToChattedWith(userEmail, crafterEmail);
  await addCrafterToChattedWith(crafterEmail, userEmail);
};

export default {
  getChatMessages,
  sendMessage,
  getCraftersChattedWith,
  recordCrafterChat,
};
