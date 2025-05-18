import WorkshopModel from "../models/WorkshopModel.js";

const isAdminOfAnyWorkshop = async (email) => {
  return await WorkshopModel.exists({ admin: email });
};

const createWorkshop = async (data) => {
  const workshop = new WorkshopModel(data);
  return await workshop.save();
};

const getWorkshopByAdmin = async (email) => {
  return await WorkshopModel.findOne({ admin: email });
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

export default {
  isAdminOfAnyWorkshop,
  createWorkshop,
  getWorkshopByAdmin,
  updateCheckpointStatus,
};
