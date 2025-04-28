import * as TemplateService from "../services/TemplateService.js";

export const createTemplate = async (req, res) => {
  try {
    const template = await TemplateService.addTemplate(req.body);
    res.status(201).json(template);
  } catch (err) {
    console.error(err); // <-- ADD THIS LINE
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
