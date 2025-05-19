import WorkshopRepository from "../repositories/WorkshopRepository.js";

const createWorkshop = async (data) => {
  return await WorkshopRepository.createWorkshop(data);
};

const getWorkshopsByAdmin = async (email) => {
  return await WorkshopRepository.getWorkshopsByAdmin(email);
};

const getWorkshopsByCrafter = async (email) => {
  return await WorkshopRepository.getWorkshopsByCrafter(email);
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

const updateCheckpointOrder = async (adminEmail, newCheckpoints) => {
  return await WorkshopRepository.updateCheckpointOrder(
    adminEmail,
    newCheckpoints
  );
};

const removeCrafterFromWorkshop = async (workshopId, crafterEmail) => {
  return await WorkshopRepository.removeCrafterFromWorkshop(
    workshopId,
    crafterEmail
  );
};

export default {
  createWorkshop,
  getWorkshopsByAdmin,
  updateCheckpointStatus,
  updateCheckpointOrder,
  getWorkshopsByCrafter,
  removeCrafterFromWorkshop,
};
