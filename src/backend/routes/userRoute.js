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

const userRouter = express.Router();

userRouter.post("/uploadAvatar", upload.single("avatar"), uploadAvatar);
userRouter.put("/update-profile/:id", updateUserProfile);
userRouter.get("/search", searchCrafters);
userRouter.get("/email/:email", getUserByEmail);
userRouter.put("/preferences", updatePreferences);
userRouter.put("/card-info", updateCardInfo);

export default userRouter;
