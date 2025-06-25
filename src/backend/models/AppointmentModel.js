import mongoose from "mongoose";
import { AppointmentStatusArray } from "./Enums/AppointmentStatus.js";

const AppointmentSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    crafterEmail: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: AppointmentStatusArray,
      default: "pending",
    },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model(
  "Appointments",
  AppointmentSchema,
  "appointments"
);
export default AppointmentModel;
