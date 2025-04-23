// components/button/Button.jsx
import React from "react";
import { StyledButton } from "./Button.styled"; 

const Button = ({ text, size = "medium", color = "#6a380f", onClick }) => {
  return (
    <StyledButton size={size} color={color} onClick={onClick} style={{ marginTop: "50px" }}>
      {text}
    </StyledButton>
  );
};

export default Button;
