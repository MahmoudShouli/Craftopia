import express from "express";
import http from "http";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import templateRoute from "./routes/templateRoute.js";
import likeRoute from "./routes/likeRoutes.js";

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/reviews", reviewRoutes);
  app.use("/appointments", appointmentRoute);
  app.use("/templates", templateRoute);
  app.use("/likes", likeRoute);

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
};

export default startServer;
