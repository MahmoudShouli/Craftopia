import styled, { keyframes } from "styled-components";

export const WorkshopCard = styled.div.withConfig({
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
  top: 1rem;
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

const styledElements = {
  WorkshopCard,
  FullscreenToggle,
  Spinner,
  Navbar,
  NavItem,
};

export default styledElements;
