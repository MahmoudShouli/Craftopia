import express from "express";
import {
  createOrder,
  getOrdersByCustomer,
  getOrdersByCrafter,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/customer", getOrdersByCustomer);
router.get("/crafter", getOrdersByCrafter);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);
router.get("/all", getAllOrders);

export default router;
