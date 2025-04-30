import * as TemplateRepository from "../repositories/TemplateRepository.js";
import { getUserByEmail } from "../repositories/UserRepository.js";

export const addTemplate = async (templateData) => {
  return await TemplateRepository.createTemplate(templateData);
};

export const getCrafterTemplates = async (crafterEmail) => {
  const templates = await TemplateRepository.getTemplatesByCrafter(
    crafterEmail
  );

  const crafter = await getUserByEmail(crafterEmail);

  const enrichedTemplates = templates.map((template) => ({
    ...(template.toObject?.() || template),
    crafterName: crafter?.name || "Unknown",
  }));

  return enrichedTemplates;
};

export const getAllTemplates = async () => {
  const templates = await TemplateRepository.getAllTemplates();

  const enrichedTemplates = await Promise.all(
    templates.map(async (template) => {
      const crafter = await getUserByEmail(template.crafterEmail);
      return {
        ...(template.toObject?.() || template), // safely convert if needed
        crafterName: crafter?.name || "Unknown",
      };
    })
  );

  return enrichedTemplates;
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
