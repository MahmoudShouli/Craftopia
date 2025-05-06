import styled, { keyframes, css } from "styled-components";

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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(138, 131, 131);
  color: #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  margin-top: 4px;

  outline: none;

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
  }

  user-select: none;
  cursor: pointer;

  ${({ animate }) =>
    animate &&
    css`
      animation: ${pop} 0.3s ease-in-out;
    `}
`;

export const DeleteIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1rem;
  color: red;
  cursor: pointer;
  z-index: 2;
  user-select: none;
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: rgb(100, 64, 64);
  }
`;

export const Avatar = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: #6a380f;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.9rem;
`;
