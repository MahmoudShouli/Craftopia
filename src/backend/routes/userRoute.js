import express from "express";
import {
  updatePreferences,
  uploadAvatar,
} from "../controllers/userController.js";
import { upload } from "../../utils/cloudinaryConfig.js";
import { updateUserProfile } from "../controllers/userController.js";
import { searchCrafters } from "../controllers/userController.js";
import { getUserByEmail } from "../controllers/userController.js";
import { updateCardInfo } from "../controllers/userController.js";
import { getCraftersByCraft } from "../controllers/userController.js";
import { deleteUser } from "../controllers/userController.js";
import { fetchAllUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/all", fetchAllUsers);
userRouter.post("/uploadAvatar", upload.single("avatar"), uploadAvatar);
userRouter.put("/update-profile/:id", updateUserProfile);
userRouter.get("/search", searchCrafters);
userRouter.get("/email/:email", getUserByEmail);
userRouter.put("/preferences", updatePreferences);
userRouter.put("/card-info", updateCardInfo);
userRouter.get("/crafters-by-craft", getCraftersByCraft);
userRouter.delete("/:id", deleteUser);
export default userRouter;
