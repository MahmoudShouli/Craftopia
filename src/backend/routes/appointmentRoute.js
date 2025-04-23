import express from "express";
import {
  createAppointment,
  getAppointmentsByEmail,
  deleteAppointment,
  disableDate,
  enableDate,
  getDisabledDates,
} from "../controllers/appointmentController.js";

const ApppintmentRouter = express.Router();

ApppintmentRouter.post("/create", createAppointment);
ApppintmentRouter.get("/:email", getAppointmentsByEmail);
ApppintmentRouter.delete("/delete/:id", deleteAppointment);
ApppintmentRouter.post("/disableDate", disableDate);
ApppintmentRouter.post("/enableDate", enableDate);
ApppintmentRouter.get("/disabledDates/:crafterEmail", getDisabledDates);

export default ApppintmentRouter;
