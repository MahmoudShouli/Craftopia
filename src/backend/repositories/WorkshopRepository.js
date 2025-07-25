import WorkshopModel from "../models/WorkshopModel.js";

const createWorkshop = async (data) => {
  const workshop = new WorkshopModel(data);
  return await workshop.save();
};

const getWorkshopsByAdmin = async (email) => {
  return await WorkshopModel.find({ admin: email });
};

const getWorkshopsByCrafter = async (email) => {
  return await WorkshopModel.find({ "crafters.email": email });
};

const getCheckpointsByWorkshopId = async (workshopId) => {
  const workshop = await WorkshopModel.findById(workshopId, { checkpoints: 1 });
  return workshop?.checkpoints || [];
};

const updateCheckpointStatus = async (
  adminEmail,
  checkpointName,
  newStatus
) => {
  return await WorkshopModel.findOneAndUpdate(
    { admin: adminEmail, "checkpoints.name": checkpointName },
    { $set: { "checkpoints.$.status": newStatus } },
    { new: true }
  );
};

const updateCheckpointOrder = async (adminEmail, newCheckpoints) => {
  return await WorkshopModel.findOneAndUpdate(
    { admin: adminEmail },
    { $set: { checkpoints: newCheckpoints } },
    { new: true }
  );
};

const updateCrafterStatus = async (workshopId, crafterEmail, newStatus) => {
  return await WorkshopModel.findOneAndUpdate(
    { _id: workshopId, "crafters.email": crafterEmail },
    { $set: { "crafters.$.status": newStatus } },
    { new: true }
  );
};

const removeCrafterFromWorkshop = async (workshopId, crafterEmail) => {
  return await WorkshopModel.findByIdAndUpdate(
    workshopId,
    { $pull: { crafters: { email: crafterEmail } } },
    { new: true }
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
