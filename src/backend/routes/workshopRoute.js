import express from "express";
import {
  createWorkshop,
  getWorkshopsByAdmin,
  getWorkshopsByCrafter,
  getCheckpointsByWorkshopId,
  updateCheckpointStatus,
  updateCheckpointOrder,
  updateCrafterStatus,
  removeCrafter,
} from "../controllers/workshopController.js";

const workshopRouter = express.Router();

workshopRouter.post("/create", createWorkshop);
workshopRouter.get("/admin-workshop/:email", getWorkshopsByAdmin);
workshopRouter.get("/crafter-workshop/:email", getWorkshopsByCrafter);
workshopRouter.patch("/checkpoint-status", updateCheckpointStatus);
workshopRouter.patch("/checkpoints-order", updateCheckpointOrder);
workshopRouter.put("/remove-crafter/:workshopId", removeCrafter);
workshopRouter.put("/update-crafter-status/:workshopId", updateCrafterStatus);
workshopRouter.get("/checkpoints/:id", getCheckpointsByWorkshopId);

export default workshopRouter;
