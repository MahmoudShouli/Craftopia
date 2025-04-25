// controllers/reviewController.js
import ReviewModel from "../models/ReviewModel.js";
import UserModel from "../models/UserModel.js";
import { ReviewType } from "../models/enums/reviewType.js";

export const addReview = async (req, res) => {
  const { email, message, rating, type, to } = req.body;

  if (!email || !message || !rating || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const review = new ReviewModel({ email, message, rating, type, to });
    await review.save();
    res.status(201).json({ message: "Review saved successfully" });
  } catch (error) {
    console.error("Save review error:", error.message);
    res.status(500).json({ error: "Failed to save review" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ type: ReviewType.SITE });

    const enrichedReviews = await Promise.all(
      reviews.map(async (review) => {
        const user = await UserModel.findOne({ email: review.email });

        return {
          ...review.toObject(),
          user: user
            ? { name: user.name, role: user.role }
            : { name: "User", role: "Customer" },
        };
      })
    );

    res.status(200).json(enrichedReviews);
  } catch (error) {
    console.error(" Get reviews error:", error);
    res.status(500).json({ error: "Failed to get reviews" });
  }
};
