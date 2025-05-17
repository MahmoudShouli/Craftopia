import mongoose from "mongoose";

const CheckpointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["in progress", "finished"],
    default: "in progress",
  },
});

const CraftersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in"],
    default: "pending",
  },
});

const MessageSchema = mongoose.Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  liked: { type: Boolean, default: false },
});

const WorkshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: String, required: true },
  crafters: [CraftersSchema],
  checkpoints: [CheckpointSchema], // ordered array of checkpoints
  messages: [MessageSchema],
  status: {
    type: String,
    enum: ["in progress", "finished"],
    default: "in progress",
  },
});

const WorkshopModel = mongoose.model("Workshops", WorkshopSchema, "workshops");

export default WorkshopModel;
