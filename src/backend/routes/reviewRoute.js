// routes/reviewRoutes.js
import express from "express";
import { addReview, getAllReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/addReview", addReview);
router.get("/getAllReviews", getAllReviews);

export default router;
