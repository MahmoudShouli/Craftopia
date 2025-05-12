import express from "express";
import { upload } from "../../utils/cloudinaryConfig.js";
import * as TemplateController from "../controllers/templateController.js";

const templateRoute = express.Router();

// Upload image to Cloudinary
templateRoute.post(
  "/upload",
  upload.single("image"),
  TemplateController.uploadImage
);

// POST /templates
templateRoute.post("/", TemplateController.createTemplate);

// GET /templates
templateRoute.get("/", TemplateController.getAllTemplates);

// GET /templates/crafter/:email
templateRoute.get("/crafter/:email", TemplateController.getCrafterTemplates);

// DELETE /templates/:id
templateRoute.delete("/:id", TemplateController.deleteTemplate);

// PUT /templates/:id
templateRoute.put("/:id", TemplateController.updateTemplate);

templateRoute.get("/sorted", TemplateController.getSortedTemplates);

templateRoute.get(
  "/recommended/:userEmail",
  TemplateController.fetchRecommendedTemplates
);

templateRoute.post("/extract-colors", TemplateController.handleColorExtraction);

templateRoute.post(
  "/generate-description",
  TemplateController.handleGenerateFromImage
);

export default templateRoute;
