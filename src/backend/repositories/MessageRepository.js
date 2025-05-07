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

const findById = async (id) => {
  return await MessageModel.findById(id);
};

const deleteMessageById = async (id) => {
  return await MessageModel.findByIdAndDelete(id);
};

export default {
  getChat,
  addMessage,
  findById,
  deleteMessageById,
};
