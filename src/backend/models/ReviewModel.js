import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true },
});

const ReviewModel = mongoose.model("Reviews", ReviewSchema, "reviews");

export default ReviewModel;
