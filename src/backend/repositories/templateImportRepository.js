import User from "../models/UserModel.js";
import Template from "../models/TemplateModel.js";

/**
 * Find crafter by email (must have role = Crafter)
 */
export const findCrafterByEmail = async (email) => {
  return await User.findOne({ email, role: "crafter" });
};

/**
 * Save a new template entry
 */
export const createTemplate = async (data) => {
  const template = new Template(data);
  return await template.save();
};
