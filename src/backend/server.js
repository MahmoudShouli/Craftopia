/* eslint-disable no-undef */
import express from "express";
import http from "http";
import cors from "cors";
import authRouter from "./routes/authRoute.js";

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
  app.use(express.json());
  app.use("/api", authRouter);

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
};

export default startServer;
