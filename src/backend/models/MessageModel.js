import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  liked: { type: Boolean, default: false },
});

const MessageModel = mongoose.model("Message", MessageSchema, "messages");

export default MessageModel;
