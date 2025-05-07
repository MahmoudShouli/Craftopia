import { getUserByEmail } from "../repositories/UserRepository.js";

export const fetchUserByEmail = async (email) => {
  return await getUserByEmail(email);
};
