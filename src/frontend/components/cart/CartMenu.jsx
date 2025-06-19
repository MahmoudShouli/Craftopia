import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const Container = styled.div`
  padding: 12px;
  width: 260px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #f0f0f0;
`;

const Info = styled.div`
  flex: 1;
  overflow: hidden;
`;

const RemoveBtn = styled.div`
  color: red;
  cursor: pointer;
`;

const TotalWrapper = styled.div`
  font-weight: 600;
  text-align: right;
  margin-top: 8px;
  color: #333;
`;

const ConfirmButton = styled.button`
  background-color: #6a380f;
  color: white;
  border: none;
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 8px;
`;

const CartMenu = ({ cartOrders, onRemove, onConfirm }) => {
  const total = cartOrders.reduce((sum, order) => {
    const template = order.template || {};
    const price = Number(template.price || order.price || 0);
    return sum + price;
  }, 0);

  return (
    <Container>
      {cartOrders.length === 0 ? (
        <div style={{ fontStyle: "italic", color: "#777" }}>No items yet</div>
      ) : (
        cartOrders.map((order) => {
          const template = order.template || {};
          return (
            <CartItem key={order._id}>
              <ItemImage
                src={template.mainImage || "/placeholder.jpg"}
                alt="template"
              />
              <Info>
                <div
                  style={{
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {template.name || order.name}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#6a380f" }}>
                  ${Number(template.price || order.price || 0).toFixed(2)}
                </div>
              </Info>
              <RemoveBtn onClick={() => onRemove(order._id)}>
                <FaTimes />
              </RemoveBtn>
            </CartItem>
          );
        })
      )}
      {cartOrders.length > 0 && (
        <>
          <TotalWrapper>Total: ${total.toFixed(2)}</TotalWrapper>
          <ConfirmButton onClick={onConfirm}>Confirm Purchase</ConfirmButton>
        </>
      )}
    </Container>
  );
};

export default CartMenu;
