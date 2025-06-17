import { generateImageFromDescription } from "../services/aiService.js";

export const generateTemplateImage = async (req, res) => {
  const { description } = req.body;

  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Description is required." });
  }

  try {
    const imageUrl = await generateImageFromDescription(description);
    res.json({ imageUrl });
  } catch (err) {
    console.error("❌ AI image generation failed:", err.message);
    res.status(500).json({ error: "Failed to generate image." });
  }
};
