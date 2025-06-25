import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${({ bg }) => bg || "#f0f0f0"};
  padding: 1.5rem;
  border-radius: 16px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  border: 1px solid transparent;
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    border: 1px solid #999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const IconCircle = styled.div`
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Label = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-top: 4px;
`;

const Change = styled.div`
  font-size: 0.8rem;
  color: ${({ positive }) => (positive ? "#28a745" : "#d6336c")};
  margin-top: 4px;
`;

const StatCard = ({ icon, value, label, change, bg, positive = true }) => {
  return (
    <Card bg={bg}>
      <IconCircle>{icon}</IconCircle>
      <Value>{value}</Value>
      <Label>{label}</Label>
      <Change positive={positive}>{change}</Change>
    </Card>
  );
};

export default StatCard;
