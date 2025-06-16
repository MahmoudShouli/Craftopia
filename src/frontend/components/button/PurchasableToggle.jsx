import React from "react";
import styled from "styled-components";

const Box = styled.div`
  border: 2px solid #6a380f;
  border-radius: 12px;
  padding: 16px 24px;
  background-color: #f9e9d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px auto;
  max-width: 350px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #4e2c0b;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: #6a380f;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const PurchasableToggle = ({ value, onChange }) => {
  return (
    <Box>
      <Label>Purchasable</Label>
      <Switch>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span />
      </Switch>
    </Box>
  );
};

export default PurchasableToggle;
