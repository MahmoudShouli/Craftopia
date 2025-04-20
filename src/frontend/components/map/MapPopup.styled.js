import styled, { keyframes } from "styled-components";

export const MapPopupContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MapWrapper = styled.div`
  flex: 1;
  width: 80vw;
  height: 80vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  margin-top: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 10000;
  padding: 10px 20px;
  background-color: #6a380f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

export const DistanceControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  gap: 0.4rem;
`;

export const DistanceLabel = styled.label`
  font-weight: 700;
  color: #6a380f;
`;

export const DistanceInput = styled.input`
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 70px;
`;

export const ApplyButton = styled.button`
  background-color: #6a380f;
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: #4f2a07;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

export const AvatarMarkerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${bounce} 1s infinite;
`;

export const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 5px #000;
`;

export const RedPointer = styled.div`
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  margin-top: -5px;
  box-shadow: 0 0 5px red;
`;
