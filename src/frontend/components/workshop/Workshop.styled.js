import styled from "styled-components";

const WorkshopCard = styled.div`
  position: relative;
  display: flex;
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

const styledElements = {
  WorkshopCard,
  FullscreenToggle,
};

export default styledElements;
