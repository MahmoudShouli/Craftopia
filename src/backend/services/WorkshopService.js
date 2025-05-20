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

const getCheckpointsByWorkshopId = async (workshopId) => {
  return await WorkshopRepository.getCheckpointsByWorkshopId(workshopId);
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

const updateCrafterStatus = async (workshopId, crafterEmail, newStatus) => {
  return await WorkshopRepository.updateCrafterStatus(
    workshopId,
    crafterEmail,
    newStatus
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
  getCheckpointsByWorkshopId,
  updateCheckpointStatus,
  updateCheckpointOrder,
  getWorkshopsByCrafter,
  removeCrafterFromWorkshop,
  updateCrafterStatus,
};
