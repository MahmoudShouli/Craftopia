import express from "express";
import { isAdminOfAnyWorkshop } from "../controllers/workshopController.js";

const workshopRouter = express.Router();

workshopRouter.get("/is-admin/:email", isAdminOfAnyWorkshop);

export default workshopRouter;
