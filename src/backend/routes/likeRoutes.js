import express from "express";
import * as LikeController from "../controllers/likeController.js";

const router = express.Router();

router.post("/toggle", LikeController.toggleLike);
router.get("/:userEmail", LikeController.getLikedTemplateIds);

export default router;
