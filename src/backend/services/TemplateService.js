import * as TemplateRepository from "../repositories/TemplateRepository.js";
import { getUserByEmail } from "../repositories/UserRepository.js";
import { getLikedTemplatesByUser } from "../repositories/LikeRepository.js";
import getColors from "get-image-colors";

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
  return colorDistance(userColor, templateColor) < 80;
};

// Main recommendation logic
export const getRecommendedTemplates = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  if (!user) throw new Error("User not found");

  const allTemplates = await getAllTemplates();

  //  Convert Mongoose Maps to plain JS objects safely
  const favoriteColorsRaw =
    user.preferences?.favoriteColors instanceof Map
      ? Object.fromEntries(user.preferences.favoriteColors)
      : user.preferences?.favoriteColors?.toObject?.() || {};

  const preferredTagsRaw =
    user.preferences?.preferredTags instanceof Map
      ? Object.fromEntries(user.preferences.preferredTags)
      : user.preferences?.preferredTags?.toObject?.() || {};

  // Convert to arrays of keys
  const favoriteColors = Object.keys(favoriteColorsRaw);
  const preferredTags = Object.keys(preferredTagsRaw);

  const normalizeColor = (c) => c.trim().toLowerCase();

  const scoredTemplates = allTemplates.map((template) => {
    let colorScore = 0;
    let tagScore = 0;

    const matchedColors = [];
    const matchedTags = [];

    //  Color matching
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

    //  Tag matching
    for (const tag of template.tags || []) {
      if (preferredTags.includes(tag)) {
        tagScore += TAG_WEIGHT;
        matchedTags.push(tag);
      }
    }

    const totalScore = colorScore + tagScore;

    return {
      ...(template.toObject?.() || template),
      score: totalScore,
    };
  });

  // Filter and sort
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

export const fetchSortedTemplates = async (filters = {}) => {
  return await TemplateRepository.getTemplatesByFilter(filters);
};

export const extractColorsFromImage = async (imageUrl) => {
  const colors = await getColors(imageUrl, { type: "image/jpeg" });
  return colors.map((c) => c.hex());
};

export const generateTitleAndDescription = async ({ imageUrl }) => {
  const prompt = `
      You are given a product image of a handmade craft. Based on the visual impression of the image at the following URL, generate with a basic english a professional
      that describes the image:

      1. A short and catchy title (3–6 words max)
      2. A friendly, customer-focused 2–3 sentence product description

      Image URL: ${imageUrl}

      Respond strictly in this format:
      Title: <title>
      Description: <description>
      `;

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama2:7b",
      prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  const lines = data.response.split("\n").filter((line) => line.trim() !== "");

  const titleLine = lines.find((l) => l.toLowerCase().startsWith("title:"));
  const descriptionLine = lines.find((l) =>
    l.toLowerCase().startsWith("description:")
  );

  return {
    title: titleLine?.replace(/^title:\s*/i, "").trim() || "Untitled",
    description: descriptionLine?.replace(/^description:\s*/i, "").trim() || "",
  };
};
