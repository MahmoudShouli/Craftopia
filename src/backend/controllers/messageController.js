/* eslint-disable no-unused-vars */
import MessageService from "../services/MessageService.js";

export const getChat = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await MessageService.getChatMessages(sender, receiver);
    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch chat messages from service" });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    console.log("Incoming message data:", sender, receiver, content);

    if (!sender || !receiver || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = await MessageService.sendMessage({
      sender,
      receiver,
      content,
    });

    await MessageService.recordCrafterChat(sender, receiver);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getCraftersChattedWith = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const crafters = await MessageService.getCraftersChattedWith(userEmail);
    res.json(crafters);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve chatted-with list" });
  }
};
