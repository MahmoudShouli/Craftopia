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

const workshopService = {
  isAdminOfAnyWorkshop,
};

export default workshopService;
