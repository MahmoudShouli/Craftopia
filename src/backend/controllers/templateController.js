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
    const templates = await TemplateService.getAllTemplates(); // your service
    res.json(templates);
  } catch (err) {
    console.error("getAllTemplates error:", err);
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

export const getSortedTemplates = async (req, res) => {
  try {
    const { minPrice, maxPrice, craft } = req.query;

    const filters = {};

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    if (craft) {
      filters.craftType = craft;
    }

    const templates = await TemplateService.fetchSortedTemplates(filters);
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching sorted templates:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const fetchRecommendedTemplates = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const recommended = await TemplateService.getRecommendedTemplates(
      userEmail
    );
    res.json(recommended);
  } catch (err) {
    console.error("Error in recommendation:", err);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};

export const handleColorExtraction = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const colors = await TemplateService.extractColorsFromImage(imageUrl);
    res.status(200).json({ colors });
  } catch (err) {
    console.error("Color extraction failed:", err);
    res.status(500).json({ error: "Color extraction failed" });
  }
};

export const handleGenerateFromImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const result = await TemplateService.generateTitleAndDescription({
      imageUrl,
    });
    res.status(200).json(result);
  } catch (err) {
    console.error("Ollama generation error:", err);
    res
      .status(500)
      .json({ error: "Failed to generate title and description." });
  }
};

export const handleTemplateImport = async (req, res) => {
  try {
    const { profileUrl, email } = req.body;

    if (!profileUrl || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Missing profileUrl or email" });
    }

    const templates = await TemplateService.importTemplatesFromProfile(
      profileUrl,
      email
    );
    res.status(200).json({
      success: true,
      importedCount: templates.length,
      data: templates,
    });
  } catch (error) {
    console.error("Template import error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
