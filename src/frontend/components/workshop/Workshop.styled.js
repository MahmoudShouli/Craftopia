import styled, { keyframes } from "styled-components";

const WorkshopCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "fullscreen",
})`
  position: relative;
  display: flex;
  flex-direction: column; /* ensure vertical stacking */
  width: 100%;
  height: 80vh;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  ${({ fullscreen }) =>
    fullscreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    z-index: 9999;
  `}
`;

const FullscreenToggle = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6a380f;
  font-size: 1.5rem;
  z-index: 10;

  &:hover {
    color: #4e2709;
  }
`;

const WorkshopName = styled.h1`
  position: absolute;
  top: 1rem;
  right: 6rem;
  background: none;
  border: none;
  color: #6a380f;
  font-size: 1.5rem;
  z-index: 10;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid #6a380f;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: auto;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  background: #f8f8f8;
`;

const NavItem = styled.div`
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 5px;
  color: ${({ active }) => (active ? "#fff" : "#333")};
  background-color: ${({ active }) => (active ? "#6a380f" : "transparent")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? "#5a2f0c" : "#eee")};
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BackButton = styled.button`
  position: absolute;
  left: 1rem;
  top: 1.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #6a380f;

  &:hover {
    color: #4e2709;
  }
`;

const WorkshopGrid = styled.div`
  margin-top: 10%;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  justify-content: center; // ✅ this centers cards horizontally
  align-items: flex-start;
  width: 100%;
`;

const WorkshopCardItem = styled.div`
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  width: 240px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  h3 {
    color: #6a380f;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.3rem 0;
    color: #555;
    font-size: 0.9rem;
  }

  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    transform: translateY(-3px);
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
`;

const StatusLabel = styled.p`
  font-weight: bold;
  color: #ff6d00;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
  display: inline-block;
  margin-top: 0.5rem;
`;

const styledElements = {
  WorkshopCard,
  FullscreenToggle,
  Spinner,
  Navbar,
  NavItem,
  ContentWrapper,
  BackButton,
  WorkshopGrid,
  WorkshopCardItem,
  CenteredWrapper,
  WorkshopName,
  StatusLabel,
};

export default styledElements;
