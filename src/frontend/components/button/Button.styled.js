import styled from "styled-components";

export const StyledButton = styled.button`
  padding: ${({ size }) =>
    size === "small"
      ? "6px 12px"
      : size === "large"
      ? "12px 24px"
      : "10px 20px"};

  font-size: ${({ size }) =>
    size === "small" ? "0.8rem" : size === "large" ? "1.2rem" : "1rem"};

  background-color: ${({ color }) => color || "#6a380f"};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
