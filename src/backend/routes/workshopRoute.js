import express from "express";
import {
  createWorkshop,
  getWorkshopsByAdmin,
  getWorkshopsByCrafter,
  updateCheckpointStatus,
  updateCheckpointOrder,
} from "../controllers/workshopController.js";

const workshopRouter = express.Router();

workshopRouter.post("/create", createWorkshop);
workshopRouter.get("/admin-workshop/:email", getWorkshopsByAdmin);
workshopRouter.get("/crafter-workshop/:email", getWorkshopsByCrafter);
workshopRouter.patch("/checkpoint-status", updateCheckpointStatus);
workshopRouter.patch("/checkpoints-order", updateCheckpointOrder);

export default workshopRouter;
