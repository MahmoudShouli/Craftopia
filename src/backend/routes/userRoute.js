import express from "express";
import { uploadAvatar } from "../controllers/userController.js";
import { upload } from "../../utils/cloudinaryConfig.js";
import { updateUserProfile } from "../controllers/userController.js";
import { searchCrafters } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/uploadAvatar", upload.single("avatar"), uploadAvatar);
userRouter.put("/update-profile/:id", updateUserProfile);
userRouter.get("/search", searchCrafters);

export default userRouter;
