import { scrapePinterestPins } from "../../utils/scraper.js";
import {
  findCrafterByEmail,
  createTemplate,
} from "../repositories/templateImportRepository.js";
import { uploadImage, getDominantColors } from "../../utils/imageProcessor.js";

export const importTemplatesFromProfile = async (profileUrl, email) => {
  const crafter = await findCrafterByEmail(email);
  if (!crafter) throw new Error("Crafter not found with the provided email.");

  const scrapedTemplates = await scrapePinterestPins(profileUrl);
  if (!scrapedTemplates.length) {
    console.warn("⚠️ No templates found on the profile.");
  }

  const savedTemplates = [];

  for (const item of scrapedTemplates) {
    try {
      const uploadedImage = await uploadImage(item.image);
      if (!uploadedImage) continue;

      const dominantColors = await getDominantColors(item.image);

      const data = {
        name: item.title?.trim() || "Untitled", // ✅ REAL title from pin <h1>
        description: item.description?.trim() || "No description provided.",
        mainImage: uploadedImage,
        crafterEmail: email,
        craftType: crafter.craft || "Uncategorized",
        galleryImages: [uploadedImage],
        availableColors: dominantColors,
        tags: [],
        likes: 0,
      };

      const saved = await createTemplate(data);
      savedTemplates.push(saved);
    } catch (err) {
      console.error("❌ Error processing template:", err.message, item);
    }
  }

  return savedTemplates;
};
