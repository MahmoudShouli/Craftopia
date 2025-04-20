import User from "../models/UserModel.js";
import ReviewModel from "../models/ReviewModel.js";

export const uploadAvatar = async (req, res) => {
  try {
    const { userId } = req.body;
    const imageUrl = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: imageUrl },
      { new: true }
    );

    res.json({ success: true, avatarUrl: imageUrl, user: updatedUser });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, location, password } = req.body;

  try {
    const updateData = {
      ...(name && { name }),
      ...(location && { location }),
      ...(password && { password }),
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

export const searchCrafters = async (req, res) => {
  try {
    const { query, craft, sortBy, order } = req.query;

    const filter = { role: "crafter" };
    if (query) filter.name = { $regex: query, $options: "i" };
    if (craft) filter.craft = craft.toLowerCase();

    const users = await User.find(filter).lean();

    const usersWithRating = await Promise.all(
      users.map(async (user) => {
        const personReviews = await ReviewModel.find({
          to: user.email,
          type: "Person",
        });

        const avgRating =
          personReviews.length > 0
            ? personReviews.reduce((sum, r) => sum + r.rating, 0) /
              personReviews.length
            : 0;

        return {
          ...user,
          rating: Number(avgRating.toFixed(1)),
        };
      })
    );

    if (sortBy === "rating") {
      const direction = order === "desc" ? -1 : 1;
      usersWithRating.sort((a, b) => (a.rating - b.rating) * direction);
    }

    res.json({ success: true, users: usersWithRating });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
