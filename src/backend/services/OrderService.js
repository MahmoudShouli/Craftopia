import * as OrderRepo from "../repositories/OrderRepository.js";

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

export const deleteOrder = async (id) => {
  return await OrderRepo.deleteOrder(id);
};

export const fetchOrderById = async (id) => {
  return await OrderRepo.getOrderById(id);
};
