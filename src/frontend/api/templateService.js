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

export const fetchSortedTemplates = async () => {
  const response = await axios.get("http://localhost:3000/templates/sorted");
  console.log("Fetched templates response:", response.data);
  return response.data;
};

export const fetchRecommendedTemplates = async (email) => {
  const response = await axios.get(
    `http://localhost:3000/templates/recommended/${email}`
  );
  console.log("Fetched recommended templates:", response.data);
  return response.data;
};

export const extractColorsFromImage = async (imageUrl) => {
  const res = await fetch("http://localhost:3000/templates/extract-colors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl }),
  });

  if (!res.ok) {
    throw new Error("Color extraction failed");
  }

  const data = await res.json();
  return data.colors || [];
};

export const generateFromImage = async (imageUrl) => {
  const res = await fetch(
    "http://localhost:3000/templates/generate-description",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to generate from image");
  }

  const data = await res.json();
  return data;
};
