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

// update the temaplate by its ID
export const updateTemplate = async (id, templateData) => {
  return await TemplateModel.findByIdAndUpdate(id, templateData, { new: true });
};

// Get all the templates ordered by the likes
export const getAllTemplatesSortedByLikes = async () => {
  const templates = await TemplateModel.aggregate([
    {
      $lookup: {
        from: "users", // target collection name
        localField: "crafterEmail", // from TemplateModel
        foreignField: "email", // from UserModel
        as: "crafterInfo",
      },
    },
    {
      $unwind: "$crafterInfo", // convert crafterInfo array to object
    },
    {
      $addFields: {
        crafterName: "$crafterInfo.name",
        craftType: "$crafterInfo.craft",
      },
    },
    {
      $project: {
        crafterInfo: 0, // remove full user object if not needed
      },
    },
    {
      $sort: { likes: -1 },
    },
  ]);

  return templates;
};
