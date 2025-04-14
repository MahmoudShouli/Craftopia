// controllers/reviewController.js
import ReviewModel from "../models/ReviewModel.js";
import UserModel from "../models/UserModel.js";

export const addReview = async (req, res) => {
  const { email, message, rating } = req.body;

  if (!email || !message || rating == null) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const review = new ReviewModel({ email, message, rating });
    await review.save();
    res.status(201).json({ message: "Review saved successfully" });
  } catch (error) {
    console.error("Save review error:", error.message);
    res.status(500).json({ error: "Failed to save review" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();

    const enrichedReviews = await Promise.all(
      reviews.map(async (review) => {
        const user = await UserModel.findOne({ email: review.email });

        return {
          ...review.toObject(),
          user: user
            ? { name: user.name, role: user.role }
            : { name: "User", role: "Customer" }, // fallback
        };
      })
    );

    res.status(200).json(enrichedReviews);
  } catch (error) {
    console.error("Get reviews error:", error.message);
    res.status(500).json({ error: "Failed to get reviews" });
  }
};
