import User from "../models/UserModel.js";
import ReviewModel from "../models/ReviewModel.js";
import { fetchUserByEmail } from "../services/UserService.js";
import { updateUserPreferences } from "../services/UserService.js";
import { removeUser } from "../services/UserService.js";
import { saveCardInfo } from "../services/UserService.js";
import { getAllUsers } from "../services/UserService.js";

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
    const { query, craft, sortBy, order, lat, lng, maxDistance } = req.query;

    const filter = { role: "crafter" };
    if (query) filter.name = { $regex: query, $options: "i" };
    if (craft) filter.craft = craft.toLowerCase();

    let users = [];

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      users = await User.find({
        ...filter,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [userLng, userLat],
            },
            $maxDistance: maxDistance * 1000,
          },
        },
      }).lean();
    } else {
      users = await User.find(filter).lean();
    }

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

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await fetchUserByEmail(email);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user by email" });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const { email, favoriteColors, preferredTags } = req.body;

    if (!email || !favoriteColors || !preferredTags) {
      return res.status(400).json({ error: "Missing data." });
    }

    const result = await updateUserPreferences(
      email,
      favoriteColors,
      preferredTags
    );

    res.status(200).json({ success: true, user: result });
  } catch (err) {
    console.error("Update preferences error:", err); // ⬅️ log the real error
    res.status(500).json({ error: "Failed to update preferences." });
  }
};

export const updateCardInfo = async (req, res) => {
  try {
    const { email, cardNumber, expiryDate, cvv } = req.body;

    if (!email || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ error: "Missing card data." });
    }

    const updatedUser = await saveCardInfo(email, cardNumber, expiryDate, cvv);

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Card info update error:", error);
    res.status(500).json({ error: "Failed to save card info." });
  }
};

export const getCraftersByCraft = async (req, res) => {
  const { craft } = req.query;
  if (!craft) return res.status(400).json({ error: "Craft is required" });

  try {
    const crafters = await User.find({ role: "crafter", craft });
    res.json(crafters);
  } catch (err) {
    console.error("Failed to fetch crafters:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await removeUser(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Fetch all users error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
