import styled, { keyframes } from "styled-components";

export const MessageBubble = styled.div`
  position: relative;
  align-self: "flex-start";
  padding: 0.75rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  max-width: 60%;
  width: fit-content;
  word-break: break-word;
  margin-bottom: 1rem;
`;

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.6); }
  100% { transform: scale(1); }
`;

export const LikeIcon = styled.div`
  margin-top: 5px;
  font-size: 1rem;
  animation: ${({ animate }) => (animate ? pop : "none")} 0.3s ease-in-out;

  outline: none;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }

  user-select: none;
  cursor: default;
`;

export const DeleteIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.2rem;
  color: red;
  cursor: pointer;
  z-index: 2;
  user-select: none;
  background-color: white;
  border-radius: 50%;
  padding: 0.3rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #ffe5e5;
  }
`;
