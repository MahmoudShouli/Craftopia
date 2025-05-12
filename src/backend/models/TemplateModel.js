import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  craftType: { type: String, required: true },
  mainImage: { type: String, required: true },
  galleryImages: [{ type: String, required: false }],
  availableColors: [{ type: String, required: false }],
  sizeOptions: { type: String, required: false },
  crafterEmail: { type: String, required: true },
  tags: [{ type: String, required: true }],
  likes: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
});

const TemplateModel = mongoose.model("Templates", TemplateSchema, "templates");

export default TemplateModel;
