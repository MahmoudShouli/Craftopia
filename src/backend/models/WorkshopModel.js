import mongoose from "mongoose";

const WorkshopSchema = new mongoose.Schema({
  admin: { type: String, required: true },
  crafters: [{ type: String, required: true }],
  checkpoints: { type: Map, of: String, default: {} }, // checkpoint-name => status
  status: {
    type: String,
    enum: ["in progress", "finished"],
    default: "in progress",
  },
});

const WorkshopModel = mongoose.model("Workshops", WorkshopSchema, "workshops");

export default WorkshopModel;
