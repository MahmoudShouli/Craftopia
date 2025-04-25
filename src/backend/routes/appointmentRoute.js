import express from "express";
import {
  createAppointment,
  getAppointmentsByEmail,
  deleteAppointment,
  getDisabledDates,
} from "../controllers/appointmentController.js";

const ApppintmentRouter = express.Router();

ApppintmentRouter.post("/create", createAppointment);
ApppintmentRouter.get("/:email", getAppointmentsByEmail);
ApppintmentRouter.delete("/delete/:id", deleteAppointment);
ApppintmentRouter.get("/disabledDates/:crafterEmail", getDisabledDates);

export default ApppintmentRouter;
