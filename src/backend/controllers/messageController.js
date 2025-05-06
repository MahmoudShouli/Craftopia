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
    const { sender, receiver, content, date } = req.body;

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

export const cloudinaryImageUpload = async (req, res) => {
  try {
    const imageUrl = req.file.path; // Cloudinary returns the hosted URL here
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
