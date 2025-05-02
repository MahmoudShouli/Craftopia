import MessageRepository from "../repositories/MessageRepository.js";

const getChatMessages = async (sender, receiver) => {
  return await MessageRepository.getMessagesBetweenUsers(sender, receiver);
};

const sendMessage = async (messageData) => {
  return await MessageRepository.addMessage(messageData);
};

export default {
  getChatMessages,
  sendMessage,
};
