import * as OrderService from "../services/OrderService.js";
import { getSocketIO } from "../config/socket.js"; // ✅ import your socket getter

export const createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);

    // ✅ Emit cart update
    const io = getSocketIO();
    io.to(order.email).emit("cart_updated", { userEmail: order.email });

    res.json(order);
  } catch (err) {
    console.error("❌ Order creation error:", err);
    res
      .status(500)
      .json({ error: "Failed to create order", message: err.message });
  }
};

export const getOrdersByCustomer = async (req, res) => {
  try {
    const { email } = req.query;
    const orders = await OrderService.fetchOrdersByCustomer(email);
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to get customer orders:", err);
    res.status(500).json({ error: "Failed to get customer orders" });
  }
};

export const getOrdersByCrafter = async (req, res) => {
  try {
    const { email } = req.query;
    const orders = await OrderService.fetchOrdersByCrafter(email);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get crafter orders" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    const updated = await OrderService.updateOrder(id, status, paymentStatus);

    // ✅ (Optional) Emit cart update if cart was affected
    if (updated.email && updated.status === "confirmed") {
      const io = getSocketIO();
      io.to(updated.email).emit("cart_updated", { userEmail: updated.email });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orderToDelete = await OrderService.fetchOrderById(id);
    if (!orderToDelete) {
      console.error("Order not found for id:", id);
      return res.status(404).json({ error: "Order not found" });
    }

    await OrderService.deleteOrder(id);

    const io = getSocketIO();
    if (orderToDelete.email) {
      io.to(orderToDelete.email).emit("cart_updated", {
        userEmail: orderToDelete.email,
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete order:", err);
    res
      .status(500)
      .json({ error: "Failed to delete order", message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.fetchAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Failed to fetch all orders:", err);
    res.status(500).json({ error: "Server error" });
  }
};
