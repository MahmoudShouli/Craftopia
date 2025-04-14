import User from "../models/UserModel.js";

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
      ...(password && { password }), // no hashing in this setup
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
