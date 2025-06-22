// routes/reviewRoutes.js
import express from "express";
import {
  addReview,
  getAllReviews,
  getReviewsByEmail,
  getAllReviewsAdmin,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/addReview", addReview);
router.get("/getAllReviews", getAllReviews);
router.get("/getByEmail", getReviewsByEmail);
router.get("/admin/getAllReviews", getAllReviewsAdmin);

export default router;
