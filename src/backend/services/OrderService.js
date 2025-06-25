import * as OrderRepo from "../repositories/OrderRepository.js";
import UserModel from "../models/UserModel.js";
import TemplateModel from "../models/TemplateModel.js";

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

export const fetchAllOrders = async () => {
  const orders = await OrderRepo.getAllOrders();

  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
      if (!order || typeof order.toObject !== "function") return null;

      const customer = await UserModel.findOne({ email: order.customerEmail });
      const template = await TemplateModel.findById(order.templateId).lean();

      let crafterName = "Unknown";
      if (template?.crafterEmail) {
        const crafter = await UserModel.findOne({
          email: template.crafterEmail,
        });
        crafterName = crafter?.name || template.crafterEmail;
      }

      return {
        ...order.toObject(),
        template: {
          ...template,
          crafterName,
        },
        customerName: customer?.name || order.customerEmail,
      };
    })
  );

  return enrichedOrders.filter(Boolean);
};
