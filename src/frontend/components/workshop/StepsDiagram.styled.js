import styled, { keyframes } from "styled-components";

const grow = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 60px;
    opacity: 1;
  }
`;

export const FlowOuterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FlowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  overflow-x: auto;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StepNode = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ status }) =>
    status === "finished"
      ? "#4caf50"
      : status === "in progress"
      ? "#bdefce"
      : "#e0e0e0"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
  cursor: ${({ status }) => (status === "in progress" ? "pointer" : "default")};
  transition: background-color 0.3s ease;
`;

export const StepLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  max-width: 100px;
`;

export const ArrowConnector = styled.div`
  position: relative;
  height: 4px;
  background-color: #4caf50;
  border-radius: 2px;
  animation: ${grow} 0.5s ease-out forwards;
  width: 60px;
  opacity: 0;

  &.visible {
    opacity: 1;
  }

  &.hidden {
    display: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -6px;
    transform: translateY(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    border-top: 2px solid #4caf50;
    border-right: 2px solid #4caf50;
  }
`;
