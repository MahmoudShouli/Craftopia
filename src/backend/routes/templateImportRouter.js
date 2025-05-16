import express from "express";
import { handleTemplateImport } from "../controllers/templateImportController.js";

const router = express.Router();

router.post("/profile", handleTemplateImport);

export default router;
