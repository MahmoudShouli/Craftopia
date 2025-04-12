import express from "express";
import { signIn } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", signIn);

export default authRouter;
