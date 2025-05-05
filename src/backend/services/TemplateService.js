import * as TemplateRepository from "../repositories/TemplateRepository.js";
import { getUserByEmail } from "../repositories/UserRepository.js";
import { getLikedTemplatesByUser } from "../repositories/LikeRepository.js"; // ✅ FIXED

const COLOR_WEIGHT = 1.5;
const TAG_WEIGHT = 2.0;
const RECENCY_DECAY_MS = 1000 * 60 * 60 * 24 * 7; // 1 week

const hexToRGB = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const colorDistance = (c1, c2) => {
  const [r1, g1, b1] = hexToRGB(c1);
  const [r2, g2, b2] = hexToRGB(c2);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
};

const isColorSimilar = (userColor, templateColor) => {
  return colorDistance(userColor, templateColor) < 100;
};

export const getRecommendedTemplates = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  if (!user) throw new Error("User not found");

  const liked = await getLikedTemplatesByUser(userEmail);
  const allTemplates = await getAllTemplates();

  const recentLikes = liked.map((like) => ({
    ...like.templateId._doc,
    createdAt: like.createdAt,
  }));

  const scoredTemplates = allTemplates
    .map((template) => {
      let score = 0;

      // 🔁 Score by color similarity
      const userColors = user.favoriteColors
        ? Object.keys(user.favoriteColors)
        : [];

      for (const userColor of userColors) {
        for (const tempColor of template.availableColors || []) {
          if (userColor === tempColor || isColorSimilar(userColor, tempColor)) {
            score += COLOR_WEIGHT * (user.favoriteColors[userColor] || 1);
          }
        }
      }

      // 🏷 Score by preferred tags
      for (const tag of template.tags || []) {
        if (user.preferredTags?.[tag]) {
          score += TAG_WEIGHT * user.preferredTags[tag];
        }
      }

      // ⏱️ Add score from recent likes
      for (const liked of recentLikes) {
        if (liked._id.toString() === template._id.toString()) {
          const ageMs = Date.now() - new Date(liked.createdAt).getTime();
          const freshness = Math.max(0.1, 1 - ageMs / RECENCY_DECAY_MS);
          score += 5 * freshness;
        }
      }

      return {
        ...(template.toObject?.() || template),
        score,
      };
    })
    .filter((template) => template.score > 0) // ✅ Filter out low-score templates
    .sort((a, b) => b.score - a.score); // ✅ High to low

  return scoredTemplates;
};

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
