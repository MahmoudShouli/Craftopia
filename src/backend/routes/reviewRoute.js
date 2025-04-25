// routes/reviewRoutes.js
import express from "express";
import {
  addReview,
  getAllReviews,
  getReviewsByEmail,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/addReview", addReview);
router.get("/getAllReviews", getAllReviews);
router.get("/getByEmail", getReviewsByEmail);

export default router;
