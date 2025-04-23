import express from "express";
import {
  createAppointment,
  getAppointmentsByEmail,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const ApppintmentRouter = express.Router();

ApppintmentRouter.post("/create", createAppointment);
ApppintmentRouter.get("/:email", getAppointmentsByEmail);
ApppintmentRouter.delete("/delete/:id", deleteAppointment);

export default ApppintmentRouter;
