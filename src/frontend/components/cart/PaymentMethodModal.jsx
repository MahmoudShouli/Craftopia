import React from "react";
import styled from "styled-components";
import { updateOrder } from "../../api/orderService";
import { toast } from "react-toastify";

// ---------- STYLES ----------
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  margin: 8px;
  cursor: pointer;
  font-weight: 600;
  color: white;
  background-color: ${(props) => (props.type === "card" ? "#6a380f" : "#777")};
`;

// ---------- COMPONENT ----------
const PaymentMethodModal = ({ onSelect, onClose, orderIds = [], onPaymentDone }) => {
  const handleCashPayment = async () => {
    try {
      await Promise.all(
        orderIds.map((id) => updateOrder(id, "confirmed", "unpaid"))
      );
      toast.success("Order confirmed. Pay with cash on delivery.");

      // 🔥 Ensure real-time cart refresh and clearing
      if (onPaymentDone) await onPaymentDone();

      onClose();
    } catch (err) {
      toast.error("Failed to process cash payment");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Select Payment Method</Title>
        <Button type="card" onClick={() => onSelect("card")}>
          Pay with Card
        </Button>
        <Button type="cash" onClick={handleCashPayment}>
          Pay with Cash
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PaymentMethodModal;
