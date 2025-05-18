import WorkshopRepository from "../repositories/WorkshopRepository.js";

const isAdminOfAnyWorkshop = async (email) => {
  const result = await WorkshopRepository.isAdminOfAnyWorkshop(email);
  return !!result; // convert to boolean
};

const createWorkshop = async (data) => {
  return await WorkshopRepository.createWorkshop(data);
};

const getWorkshopByAdmin = async (email) => {
  return await WorkshopRepository.getWorkshopByAdmin(email);
};

const updateCheckpointStatus = async (
  adminEmail,
  checkpointName,
  newStatus
) => {
  return await WorkshopRepository.updateCheckpointStatus(
    adminEmail,
    checkpointName,
    newStatus
  );
};

export default {
  isAdminOfAnyWorkshop,
  createWorkshop,
  getWorkshopByAdmin,
  updateCheckpointStatus,
};
