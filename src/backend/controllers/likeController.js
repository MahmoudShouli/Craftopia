import * as LikeService from "../services/LikeService.js";

export const toggleLike = async (req, res) => {
  const { userEmail, templateId } = req.body;
  if (!userEmail || !templateId) {
    return res.status(400).json({ error: "Missing userEmail or templateId" });
  }

  try {
    const result = await LikeService.toggleLike(userEmail, templateId);
    res.json(result);
  } catch (err) {
    console.error("Toggle like failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getLikedTemplateIds = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const ids = await LikeService.getUserLikedTemplateIds(userEmail);
    res.json({ likedTemplateIds: ids });
  } catch (err) {
    console.error("Fetch likes failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};
