import express from "express";
import { uploadAvatar } from "../controllers/userController.js";
import { upload } from "../../utils/cloudinaryConfig.js";
import { updateUserProfile } from "../controllers/userController.js";

const userRouter = express.Router();

// POST /api/user/upload-avatar
userRouter.post("/uploadAvatar", upload.single("avatar"), uploadAvatar);
userRouter.put("/update-profile/:id", updateUserProfile);

export default userRouter;
