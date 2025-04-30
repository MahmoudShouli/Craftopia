import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Templates",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Likes", LikeSchema, "likes");
