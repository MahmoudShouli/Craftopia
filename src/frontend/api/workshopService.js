import axios from "axios";

const API_URL = "http://localhost:3000/workshop";

const isAdminOfAnyWorkshop = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/is-admin/${email}`);
    return response.data.hasWorkshop; // true or false
  } catch (error) {
    console.error("Failed to check if user is admin of any workshop:", error);
    return false;
  }
};

const createWorkshop = async (workshopData) => {
  const response = await axios.post(`${API_URL}/create`, workshopData);
  return response.data;
};

const getWorkshopByAdmin = async (adminEmail) => {
  try {
    const response = await axios.get(`${API_URL}/admin-workshop/${adminEmail}`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch workshop by admin:", error);
    throw error;
  }
};

const workshopService = {
  isAdminOfAnyWorkshop,
  createWorkshop,
  getWorkshopByAdmin,
};

export default workshopService;
