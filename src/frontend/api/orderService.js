import axios from "axios";
const BASE_URL = "http://localhost:3000/orders";

export const createOrder = async (orderData) => {
  const res = await axios.post(`${BASE_URL}/create`, orderData);
  return res.data;
};

export const updateOrder = async (id, status, paymentStatus) => {
  const res = await axios.put(`${BASE_URL}/update/${id}`, {
    status,
    paymentStatus,
  });
  return res.data;
};

export const getCartOrders = async (email) => {
  const response = await axios.get(
    `http://localhost:3000/orders/customer?email=${email}`
  );
  return response.data.filter((order) => order.status === "pending");
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${BASE_URL}/delete/${id}`);
  return res.data;
};
