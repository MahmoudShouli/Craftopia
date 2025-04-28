import express from "express";
import * as TemplateController from "../controllers/templateController.js";

const templateRoute = express.Router();

// POST /templates
templateRoute.post("/", TemplateController.createTemplate);

// GET /templates
templateRoute.get("/", TemplateController.getAllTemplates);

// GET /templates/crafter/:email
templateRoute.get("/crafter/:email", TemplateController.getCrafterTemplates);

// DELETE /templates/:id
templateRoute.delete("/:id", TemplateController.deleteTemplate);

export default templateRoute;
