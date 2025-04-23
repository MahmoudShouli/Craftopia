import express from "express";
import {
  createAppointment,
  getAppointmentsByEmail,
} from "../controllers/appointmentController.js";

const ApppintmentRouter = express.Router();

ApppintmentRouter.post("/create", createAppointment);
ApppintmentRouter.get("/:email", getAppointmentsByEmail);

export default ApppintmentRouter;
