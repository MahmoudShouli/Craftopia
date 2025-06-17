import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Templates",
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    crafterEmail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
