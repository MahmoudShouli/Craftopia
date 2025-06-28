import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/orders`;

export const createOrder = async (orderData) => {
  const res = await axios.post(`${API_URL}/create`, orderData);
  return res.data;
};

export const updateOrder = async (id, status, paymentStatus) => {
  const res = await axios.put(`${API_URL}/update/${id}`, {
    status,
    paymentStatus,
  });
  return res.data;
};

export const getCartOrders = async (email) => {
  const response = await axios.get(
    `${BASE_URL}/orders/customer?email=${email}`
  );
  return response.data.filter((order) => order.status === "pending");
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`);
  return res.data;
};

export const getOrdersByCrafter = async (email) => {
  try {
    const res = await axios.get(`${BASE_URL}/orders/crafter?email=${email}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch orders by crafter:", err);
    throw err;
  }
};

export const getOrdersByCustomer = async (email) => {
  try {
    const res = await axios.get(`${BASE_URL}/orders/customer?email=${email}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch orders by customer:", err);
    throw err;
  }
};

export const fetchAllOrders = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};
