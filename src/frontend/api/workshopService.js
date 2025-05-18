import axios from "axios";

const API_URL = "http://localhost:3000/workshop";

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

const workshopService = {
  createWorkshop,
  getWorkshopsByAdmin,
  getWorkshopsByCrafter,
  updateCheckpointOrder,
  updateCheckpointStatus,
};

export default workshopService;
