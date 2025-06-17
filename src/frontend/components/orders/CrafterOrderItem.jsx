import React from "react";
import styled from "styled-components";
import { FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateOrder } from "../../api/orderService";
import UserAvatar from "../useravatar/UserAvatar";
import { format } from "date-fns"; // ✅ for formatting createdAt
import notificationService from "../../api/notificationService";
import { socket } from "../../../utils/socket";
import { useUser } from "../../context/UserContext";

const OrderCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || "flex-start"};
  text-align: ${({ align }) => align || "left"};
`;

const TemplateImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 4px 0;
  color: #3b1d0f;
`;

const Price = styled.div`
  font-size: 0.95rem;
  font-weight: bold;
  color: #6a380f;
`;

const CustomerName = styled.div`
  font-weight: bold;
  margin-top: 6px;
`;

const Status = styled.div`
  margin-bottom: 4px;
  font-weight: bold;
  color: ${({ status }) => (status === "confirmed" ? "#e09f1d" : "orange")};
`;

const Payment = styled.div`
  font-weight: bold;
  color: ${({ paid }) => (paid === "paid" ? "#00bcd4" : "#f70e22")};
`;

const ActionBtn = styled.button`
  margin-top: 10px;
  background-color: #6a380f;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #4a250a;
  }
`;

const DateText = styled.small`
  opacity: 0.7;
  font-size: 0.8rem;
  margin-bottom: 6px;
`;

const CrafterOrderItem = ({ order, onUpdate }) => {
    const { user } = useUser();
  const handleMarkAsPaid = async () => {
    try {
      // 1. Update order
      await updateOrder(order._id, order.status, "paid");

      // 2. Notify customer
      const notification = {
        text: `${user.name} changed the payment status of your order to paid`,
        linkTo: " ", // optional
        email: order.customerEmail,
      };

      await notificationService.createNotification(notification);
      socket.emit("notification", {
        to: order.customerEmail,
        notification,
      });

      // ✅ Only show success after all above succeeds
      toast.success("Marked as paid!");

      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Error marking as paid:", err);
      toast.error("Failed to mark as paid.");
    }
  };

  const createdAt = order.createdAt
    ? format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")
    : "Unknown";

  return (
    <OrderCard>
      {/* Left: Template */}
      <Section align="flex-start">
        <TemplateImage
          src={order.template?.mainImage || "/placeholder.jpg"}
          alt="template"
        />
        <Title>{order.template?.name || "Unnamed"}</Title>
        <Price>{order.template?.price ? `$${order.template.price}` : "No price"}</Price>
      </Section>

      {/* Center: Customer */}
      <Section align="center">
        <UserAvatar
          previewUrl={order.customerAvatar}
          user={{ name: order.customerName }}
          width={120}
          height={120}
        />
        <CustomerName>{order.customerName || order.customerEmail}</CustomerName>
      </Section>

      {/* Right: Status + Button + Date */}
      <Section align="flex-end">
        <DateText>Created: {createdAt}</DateText>
        <Status status={order.status}>Status: {order.status}</Status>
        <Payment paid={order.paymentStatus}>Payment: {order.paymentStatus}</Payment>
        {order.status === "confirmed" && order.paymentStatus === "unpaid" && (
          <ActionBtn onClick={handleMarkAsPaid}>
            <FaMoneyBillWave style={{ marginRight: "6px" }} />
            Mark as Paid
          </ActionBtn>
        )}
      </Section>
    </OrderCard>
  );
};

export default CrafterOrderItem;
