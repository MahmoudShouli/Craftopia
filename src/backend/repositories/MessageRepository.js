import MessageModel from "../models/MessageModel.js";

const getChat = async (sender, receiver) => {
  return await MessageModel.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  }).sort({ timestamp: 1 });
};

const addMessage = async (messageData) => {
  const message = new MessageModel(messageData);
  return await message.save();
};

export default {
  getChat,
  addMessage,
};
