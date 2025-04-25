import express from "express";
import {
  createAppointment,
  getAppointmentsByEmail,
  deleteAppointment,
  getDisabledDates,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const ApppintmentRouter = express.Router();

ApppintmentRouter.post("/create", createAppointment);
ApppintmentRouter.get("/:email", getAppointmentsByEmail);
ApppintmentRouter.delete("/delete/:id", deleteAppointment);
ApppintmentRouter.get("/disabledDates/:crafterEmail", getDisabledDates);
ApppintmentRouter.patch("/:id/status", updateAppointmentStatus);

export default ApppintmentRouter;
