import mongoose from "mongoose";
import { ReviewType } from "./enums/reviewType.js";
const ReviewSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true },
  type: {
    type: String,
    enum: Object.values(ReviewType),
    required: true,
  },
  to: { type: String, required: false },
  sentiment: {
    type: String,
    enum: ["positive", "negative"],
    default: "positive",
  },
});

const ReviewModel = mongoose.model("Reviews", ReviewSchema, "reviews");

export default ReviewModel;
