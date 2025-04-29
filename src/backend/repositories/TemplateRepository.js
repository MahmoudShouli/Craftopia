import TemplateModel from "../models/TemplateModel.js";

// Create a new template
export const createTemplate = async (templateData) => {
  return await TemplateModel.create(templateData);
};

// Get all templates created by a specific crafter
export const getTemplatesByCrafter = async (crafterEmail) => {
  return await TemplateModel.find({ crafterEmail });
};

// Get all templates
export const getAllTemplates = async () => {
  return await TemplateModel.find();
};

// Get a single template by its ID
export const getTemplateById = async (id) => {
  return await TemplateModel.findById(id);
};

// Delete a template by its ID
export const deleteTemplate = async (id) => {
  return await TemplateModel.findByIdAndDelete(id);
};

export const updateTemplate = async (id, templateData) => {
  return await TemplateModel.findByIdAndUpdate(id, templateData, { new: true });
};
