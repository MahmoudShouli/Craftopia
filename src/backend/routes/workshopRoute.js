import express from "express";
import {
  isAdminOfAnyWorkshop,
  createWorkshop,
  getWorkshopByAdmin,
} from "../controllers/workshopController.js";

const workshopRouter = express.Router();

workshopRouter.get("/is-admin/:email", isAdminOfAnyWorkshop);
workshopRouter.post("/create", createWorkshop);
workshopRouter.get("/admin-workshop/:email", getWorkshopByAdmin);

export default workshopRouter;
