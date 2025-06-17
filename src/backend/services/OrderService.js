import * as OrderRepo from "../repositories/OrderRepository.js";
import UserModel from "../models/UserModel.js";

export const createOrder = async (orderData) => {
  return await OrderRepo.createOrder(orderData);
};

export const fetchOrdersByCustomer = async (email) => {
  const orders = await OrderRepo.getOrdersByCustomer(email);
  return orders.map((order) => ({
    ...order.toObject(),
    template: order.templateId, // flatten for UI
  }));
};

export const updateOrder = async (id, status, paymentStatus) => {
  return await OrderRepo.updateOrderStatus(id, status, paymentStatus);
};

// ✅ updated deleteOrder to fetch order first
export const deleteOrder = async (id) => {
  const order = await OrderRepo.getOrderById(id); // needed for email
  if (!order) return null;

  await OrderRepo.deleteOrder(id);
  return order; // return the deleted order (with email)
};

export const fetchOrderById = async (id) => {
  return await OrderRepo.getOrderById(id);
};

export const fetchOrdersByCrafter = async (email) => {
  const orders = await OrderRepo.getOrdersByCrafter(email);

  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
      const customer = await UserModel.findOne({ email: order.customerEmail });

      return {
        ...order.toObject(),
        template: order.templateId, // flatten populated template
        customerName: customer?.name || order.customerEmail,
        customerAvatar: customer?.avatarUrl || null,
      };
    })
  );

  return enrichedOrders;
};
