import * as TemplateRepository from "../repositories/TemplateRepository.js";

export const addTemplate = async (templateData) => {
  return await TemplateRepository.createTemplate(templateData);
};

export const getCrafterTemplates = async (crafterEmail) => {
  return await TemplateRepository.getTemplatesByCrafter(crafterEmail);
};

export const getAllTemplates = async () => {
  return await TemplateRepository.getAllTemplates();
};

export const getTemplate = async (id) => {
  return await TemplateRepository.getTemplateById(id);
};

export const removeTemplate = async (id) => {
  return await TemplateRepository.deleteTemplate(id);
};
