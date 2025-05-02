/* eslint-disable no-unused-vars */
import MessageService from "../services/MessageService.js";

export const getChat = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await MessageService.getChatMessages(sender, receiver);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    if (!sender || !receiver || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = await MessageService.sendMessage({
      sender,
      receiver,
      content,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};
