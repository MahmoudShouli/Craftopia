import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/workshop`;

const createWorkshop = async (workshopData) => {
  const response = await axios.post(`${API_URL}/create`, workshopData);
  return response.data;
};

const getWorkshopsByAdmin = async (adminEmail) => {
  try {
    const response = await axios.get(`${API_URL}/admin-workshop/${adminEmail}`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch workshop by admin:", error);
    throw error;
  }
};

const getWorkshopsByCrafter = async (email) => {
  try {
    const res = await axios.get(`${API_URL}/crafter-workshop/${email}`);
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch workshops for crafter:", err);
    throw err;
  }
};

const getCheckpointsByWorkshopId = async (workshopId) => {
  try {
    const res = await axios.get(`${API_URL}/checkpoints/${workshopId}`);
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch checkpoints:", err);
    throw err;
  }
};

const updateCheckpointStatus = async (
  adminEmail,
  checkpointName,
  newStatus
) => {
  const response = await axios.patch(`${API_URL}/checkpoint-status`, {
    adminEmail,
    checkpointName,
    newStatus,
  });

  return response.data;
};

const updateCheckpointOrder = async (adminEmail, checkpoints) => {
  const response = await axios.patch(`${API_URL}/checkpoints-order`, {
    adminEmail,
    checkpoints,
  });
  return response.data;
};

export const updateCrafterStatus = async (
  workshopId,
  crafterEmail,
  newStatus
) => {
  try {
    const res = await axios.put(
      `${API_URL}/update-crafter-status/${workshopId}`,
      {
        crafterEmail,
        newStatus,
      }
    );
    return res.data;
  } catch (err) {
    console.error("❌ Failed to update crafter status:", err);
    throw err;
  }
};

const removeCrafterFromWorkshop = async (workshopId, crafterEmail) => {
  try {
    const res = await axios.put(`${API_URL}/remove-crafter/${workshopId}`, {
      crafterEmail,
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to remove crafter:", err);
    throw err;
  }
};

const workshopService = {
  createWorkshop,
  getWorkshopsByAdmin,
  getWorkshopsByCrafter,
  getCheckpointsByWorkshopId,
  updateCheckpointOrder,
  updateCheckpointStatus,
  updateCrafterStatus,
  removeCrafterFromWorkshop,
};

export default workshopService;
