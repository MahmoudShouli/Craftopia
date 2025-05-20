import ReviewModel from "../models/ReviewModel.js";
import UserModel from "../models/UserModel.js";
import { ReviewType } from "../models/enums/reviewType.js";
import { analyzeReview } from "../services/sentimentService.js";

export const addReview = async (req, res) => {
  const { email, message, rating, type, to } = req.body;

  if (!email || !message || !rating || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await analyzeReview(message);

    const review = new ReviewModel({
      email,
      message,
      rating,
      type,
      to,
      sentiment: result.sentiment,
    });

    await review.save();

    res.status(201).json({
      message: "Review saved",
      sentiment: result.sentiment,
      language: result.language,
      translated: result.translatedText || null,
    });
  } catch (error) {
    console.error("Save review error:", error);
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
            ? {
                name: user.name,
                role: user.role,
                avatarUrl: user.avatarUrl || "",
              }
            : { name: "User", role: "Customer", avatarUrl: "" },
        };
      })
    );
    res.status(200).json(enrichedReviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ error: "Failed to get reviews" });
  }
};

export const getReviewsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const reviews = await ReviewModel.find({
      to: email,
      type: "Person",
    }).sort({ createdAt: -1 });

    const enrichedReviews = await Promise.all(
      reviews.map(async (review) => {
        const user = await UserModel.findOne({ email: review.email });
        return {
          ...review.toObject(),
          user: user
            ? {
                name: user.name,
                avatarUrl: user.avatarUrl,
                role: user.role,
              }
            : {
                name: "Anonymous",
                avatarUrl: "",
                role: "Customer",
              },
        };
      })
    );

    res.status(200).json(enrichedReviews);
  } catch (err) {
    console.error("Error fetching crafter reviews:", err);
    res.status(500).json({ error: "Server error while fetching reviews" });
  }
};
