import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getOrdersByCustomer } from "../../api/orderService";
import UserOrderItem from "./CrafterOrderItem";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
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

const UserOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersByCustomer(user.email);
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch user orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <PageContainer>
      <OrderCard>
        <Title>My Purchases</Title>
        {orders.length === 0 ? (
          <EmptyMessage>No orders found.</EmptyMessage>
        ) : (
          orders.map((order) => <UserOrderItem key={order._id} order={order} />)
        )}
      </OrderCard>
    </PageContainer>
  );
};

export default UserOrders;
