import mongoose from "mongoose";

const CheckpointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["in progress", "finished"],
    default: "in progress",
  },
});

const WorkshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: String, required: true },
  crafters: [{ type: String, required: true }],
  checkpoints: [CheckpointSchema], // ordered array of checkpoints
  status: {
    type: String,
    enum: ["in progress", "finished"],
    default: "in progress",
  },
});

const WorkshopModel = mongoose.model("Workshops", WorkshopSchema, "workshops");

export default WorkshopModel;
