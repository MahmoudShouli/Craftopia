import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Templates",
      required: false,
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
    name: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
