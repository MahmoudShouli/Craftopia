import * as TemplateRepository from "../repositories/TemplateRepository.js";
import { getUserByEmail } from "../repositories/UserRepository.js";
import { getLikedTemplatesByUser } from "../repositories/LikeRepository.js";

const COLOR_WEIGHT = 5;
const TAG_WEIGHT = 3;
const RECENCY_DECAY_MS = 1000 * 60 * 60 * 24 * 7; // 1 week

// Convert hex color to RGB
const hexToRGB = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

// Calculate color distance
const colorDistance = (c1, c2) => {
  try {
    const [r1, g1, b1] = hexToRGB(c1);
    const [r2, g2, b2] = hexToRGB(c2);
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  } catch {
    return Infinity;
  }
};

// Check visual similarity
const isColorSimilar = (userColor, templateColor) => {
  return colorDistance(userColor, templateColor) < 100;
};

// Main recommendation logic
export const getRecommendedTemplates = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  if (!user) throw new Error("User not found");

  const allTemplates = await getAllTemplates();

  // ✅ Convert Mongoose Maps to plain JS objects safely
  const favoriteColorsRaw =
    user.preferences?.favoriteColors instanceof Map
      ? Object.fromEntries(user.preferences.favoriteColors)
      : user.preferences?.favoriteColors?.toObject?.() || {};

  const preferredTagsRaw =
    user.preferences?.preferredTags instanceof Map
      ? Object.fromEntries(user.preferences.preferredTags)
      : user.preferences?.preferredTags?.toObject?.() || {};

  // ✅ Log raw data
  console.log("🧾 Raw Preferences:", {
    favoriteColorsRaw,
    preferredTagsRaw,
  });

  // ✅ Convert to arrays of keys
  const favoriteColors = Object.keys(favoriteColorsRaw);
  const preferredTags = Object.keys(preferredTagsRaw);

  console.log("🎨 Favorite Colors:", favoriteColors);
  console.log("🏷️ Preferred Tags:", preferredTags);

  const normalizeColor = (c) => c.trim().toLowerCase();

  const scoredTemplates = allTemplates.map((template) => {
    let colorScore = 0;
    let tagScore = 0;

    const matchedColors = [];
    const matchedTags = [];

    // ✅ Color matching
    for (const userColor of favoriteColors) {
      for (const templateColor of template.availableColors || []) {
        const uColor = normalizeColor(userColor);
        const tColor = normalizeColor(templateColor);

        if (uColor === tColor || isColorSimilar(uColor, tColor)) {
          colorScore += COLOR_WEIGHT;
          matchedColors.push(tColor);
          break; // only score once per user color
        }
      }
    }

    // ✅ Tag matching
    for (const tag of template.tags || []) {
      if (preferredTags.includes(tag)) {
        tagScore += TAG_WEIGHT;
        matchedTags.push(tag);
      }
    }

    const totalScore = colorScore + tagScore;

    // ✅ Template debug log
    console.log({
      templateName: template.name,
      templateTags: template.tags,
      templateColors: template.availableColors,
      matchedTags,
      matchedColors,
      tagScore,
      colorScore,
      totalScore,
    });

    return {
      ...(template.toObject?.() || template),
      score: totalScore,
    };
  });

  // ✅ Filter and sort
  const recommended = scoredTemplates
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score);

  return recommended;
};

//-------------------------------------------
// CRUD and Utility Methods
export const addTemplate = async (templateData) => {
  return await TemplateRepository.createTemplate(templateData);
};

export const getCrafterTemplates = async (crafterEmail) => {
  const templates = await TemplateRepository.getTemplatesByCrafter(
    crafterEmail
  );
  const crafter = await getUserByEmail(crafterEmail);
  return templates.map((template) => ({
    ...(template.toObject?.() || template),
    crafterName: crafter?.name || "Unknown",
  }));
};

export const getAllTemplates = async () => {
  const templates = await TemplateRepository.getAllTemplates();
  return await Promise.all(
    templates.map(async (template) => {
      const crafter = await getUserByEmail(template.crafterEmail);
      return {
        ...(template.toObject?.() || template),
        crafterName: crafter?.name || "Unknown",
      };
    })
  );
};

export const getTemplate = async (id) => {
  return await TemplateRepository.getTemplateById(id);
};

export const removeTemplate = async (id) => {
  return await TemplateRepository.deleteTemplate(id);
};

export const updateTemplate = async (id, templateData) => {
  return await TemplateRepository.updateTemplate(id, templateData);
};

export const fetchSortedTemplates = async () => {
  return await TemplateRepository.getAllTemplatesSortedByLikes();
};
