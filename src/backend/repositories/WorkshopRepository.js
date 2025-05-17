import WorkshopModel from "../models/WorkshopModel.js";

const isAdminOfAnyWorkshop = async (email) => {
  return await WorkshopModel.exists({ admin: email });
};

export default {
  isAdminOfAnyWorkshop,
};
