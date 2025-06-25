import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getOrdersByCrafter, createOrder } from "../../api/orderService";
import CrafterOrderItem from "./CrafterOrderItem";
import CrafterStats from "./CrafterStats";
import styled from "styled-components";
import { socket } from "../../../utils/socket";

export const OrderCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 70%;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const StatsCard = styled.div`
  width: 35%;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const PlusButton = styled.button`
  background-color: #6a380f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 20px;
  cursor: pointer;
`;

const EmptyMessage = styled.p`
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #6a380f;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const CrafterOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [price, setPrice] = useState("");

  const fetchOrders = async () => {
    try {
      const data = await getOrdersByCrafter(user.email);
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch crafter orders", err);
    }
  };

  const handleCreateOrder = async () => {
    try {
      await createOrder({
        crafterEmail: user.email,
        customerEmail: customerEmail,
        name: name,
        price: parseFloat(price),
      });
      socket.emit("join_cart", customerEmail);
      setShowModal(false);
      setName("");
      setCustomerEmail("");
      setPrice("");
      fetchOrders();
    } catch (err) {
      console.error("Failed to create order", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <OrderCard>
        <TitleWrapper>
          <Title>My Orders</Title>
          <PlusButton onClick={() => setShowModal(true)}>+</PlusButton>
        </TitleWrapper>
        {orders.length === 0 ? (
          <EmptyMessage>No orders found.</EmptyMessage>
        ) : (
          orders.map((order) => (
            <CrafterOrderItem
              key={order._id}
              order={order}
              onUpdate={fetchOrders}
            />
          ))
        )}
      </OrderCard>

      <StatsCard>
        <CrafterStats />
      </StatsCard>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <h3>Create New Order</h3>
            <Input
              type="text"
              placeholder="Order Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Customer Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button onClick={handleCreateOrder}>OK</Button>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default CrafterOrders;
