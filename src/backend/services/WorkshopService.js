import WorkshopRepository from "../repositories/WorkshopRepository.js";

const isAdminOfAnyWorkshop = async (email) => {
  const result = await WorkshopRepository.isAdminOfAnyWorkshop(email);
  return !!result; // convert to boolean
};

export default {
  isAdminOfAnyWorkshop,
};
