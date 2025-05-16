import { importTemplatesFromProfile } from "../services/templateImportService.js";

export const handleTemplateImport = async (req, res) => {
  try {
    const { profileUrl, email } = req.body;

    if (!profileUrl || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Missing profileUrl or email" });
    }

    const templates = await importTemplatesFromProfile(profileUrl, email);
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
