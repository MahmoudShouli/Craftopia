/* eslint-disable no-unused-vars */
import MessageService from "../services/MessageService.js";
import { getSocketIO } from "../config/socket.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import axios from "axios";

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

    await MessageService.recordChat(sender, receiver);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const crafters = await MessageService.getContacts(userEmail);
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

export const cloudinaryImageUploadFromUrl = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "messages" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return res.status(500).json({ error: "Upload failed" });
        }
        res.status(200).json({ url: result.secure_url });
      }
    );

    streamifier.createReadStream(response.data).pipe(uploadStream);
  } catch (err) {
    console.error("❌ Failed to process image URL:", err.message);
    res.status(500).json({ error: "Server error during upload" });
  }
};

export const cloudinaryAudioUpload = async (req, res) => {
  try {
    const url = req.file.path;
    res.json({ url });
  } catch (err) {
    console.error("Audio upload error:", err);
    res.status(500).json({ error: "Audio upload failed" });
  }
};

export const toggleLikeMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const updated = await MessageService.toggleLike(messageId);

    const io = getSocketIO();
    io.emit("message_liked", {
      messageId: messageId,
      liked: updated.liked,
    });

    res.json({ success: true, message: updated });
  } catch (err) {
    console.error("Error toggling like:", err.message);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const deleted = await MessageService.deleteMessage(messageId);

    const io = getSocketIO();
    io.emit("message_deleted", { messageId });

    res.json({ success: true, message: "Message deleted", data: deleted });
  } catch (err) {
    console.error("Error deleting message:", err.message);
    res.status(500).json({ error: err.message || "Server error" });
  }
};
