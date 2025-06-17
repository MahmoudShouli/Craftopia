import express from "express";
import { generateTemplateImage } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-image", generateTemplateImage);

export default router;
