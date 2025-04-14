import express from "express";
import { signIn } from "../controllers/authController.js";
import { registerUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", signIn);
authRouter.post("/register", registerUser);

export default authRouter;
