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

const WorkshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: String, required: true },
  crafters: [CraftersSchema],
  checkpoints: [CheckpointSchema],
});

const WorkshopModel = mongoose.model("Workshops", WorkshopSchema, "workshops");

export default WorkshopModel;
