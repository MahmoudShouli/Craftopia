import * as TemplateService from "../services/TemplateService.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(200).json({ imageUrl: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export const createTemplate = async (req, res) => {
  try {
    const template = await TemplateService.addTemplate(req.body);
    res.status(201).json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create template" });
  }
};

export const getCrafterTemplates = async (req, res) => {
  try {
    const { email } = req.params;
    const templates = await TemplateService.getCrafterTemplates(email);
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
};

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await TemplateService.getAllTemplates();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    await TemplateService.removeTemplate(id);
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete template" });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTemplate = await TemplateService.updateTemplate(id, req.body);
    res.json(updatedTemplate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update template" });
  }
};
