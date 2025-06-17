import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getOrdersByCrafter } from "../../api/orderService";
import CrafterOrderItem from "./CrafterOrderItem";
import CrafterStats from "./CrafterStats";
import styled from "styled-components";

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
  width:70%;
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

const Title = styled.h2`
  margin-bottom: 16px;
    text-align: center;
`;

const EmptyMessage = styled.p`
  color: #666;
  text-align: center;
  margin-top: 20px;
`;

const CrafterOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersByCrafter(user.email);
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch crafter orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <OrderCard>
        <Title>My Orders</Title>
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
    </Container>
  );
};

export default CrafterOrders;