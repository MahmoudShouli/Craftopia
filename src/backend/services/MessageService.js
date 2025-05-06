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

export const toggleLike = async (messageId) => {
  const message = await MessageRepository.findById(messageId);
  if (!message) throw new Error("Message not found");

  message.liked = !message.liked;
  await message.save();

  return message;
};

const deleteMessage = async (id) => {
  const deleted = await MessageRepository.deleteMessageById(id);
  if (!deleted) throw new Error("Message not found");
  return deleted;
};

export default {
  getChatMessages,
  sendMessage,
  getContacts,
  recordChat,
  toggleLike,
  deleteMessage,
};
