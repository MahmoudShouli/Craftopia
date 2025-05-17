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

export default {
  isAdminOfAnyWorkshop,
  createWorkshop,
  getWorkshopByAdmin,
};
