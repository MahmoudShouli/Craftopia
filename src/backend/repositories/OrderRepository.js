import OrderModel from "../models/OrderModel.js";

export const createOrder = async (orderData) => {
  return await OrderModel.create(orderData);
};

export const getOrdersByCustomer = async (customerEmail) => {
  return await OrderModel.find({ customerEmail, status: "pending" }).populate(
    "templateId"
  );
};

export const getOrdersByCrafter = async (crafterEmail) => {
  return await OrderModel.find({ crafterEmail });
};

export const updateOrderStatus = async (id, status, paymentStatus) => {
  return await OrderModel.findByIdAndUpdate(
    id,
    { status, paymentStatus },
    { new: true }
  );
};

export const deleteOrder = async (id) => {
  return await OrderModel.findByIdAndDelete(id);
};

export const getOrderById = async (id) => {
  return await OrderModel.findById(id);
};
