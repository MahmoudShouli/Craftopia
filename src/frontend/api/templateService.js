import axios from "axios";

const API_URL = "http://localhost:3000/templates";

// Create a new template
export const createTemplate = async (templateData) => {
  const response = await axios.post(API_URL, templateData);
  return response.data;
};

// Get all templates
export const getAllTemplates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get templates by crafter email
export const getTemplatesByCrafter = async (crafterEmail) => {
  const response = await axios.get(`${API_URL}/crafter/${crafterEmail}`);
  return response.data;
};

// Delete a template by ID
export const deleteTemplate = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Update a template
export const updateTemplate = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.imageUrl; // cloudinary URL
};
