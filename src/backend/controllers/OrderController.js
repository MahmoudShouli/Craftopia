import * as OrderService from "../services/OrderService.js";

export const createOrder = async (req, res) => {
  try {
    console.log("💡 Incoming order body:", req.body);
    const order = await OrderService.createOrder(req.body);
    res.json(order);
  } catch (err) {
    console.error("❌ Order creation error:", err); // FULL error log
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
    console.error("❌ Failed to get customer orders:", err); // 👈 ADD THIS
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
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderService.deleteOrder(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
