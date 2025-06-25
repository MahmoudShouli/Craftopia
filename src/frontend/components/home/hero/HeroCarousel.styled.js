import styled from "styled-components";

// Main Wrappers
export const CarouselWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const SlidesContainer = styled.div`
  display: flex;
  width: ${({ $count }) => `${$count * 100}vw`};
  transform: ${({ $activeIndex }) => `translateX(-${$activeIndex * 100}vw)`};
  transition: transform 1s ease-in-out;
`;

export const Slide = styled.div`
  flex: 0 0 100vw;
  height: 100vh;
  background: url(${({ $bg }) => $bg}) center center/cover no-repeat;
  position: relative;
  display: flex;
  justify-content: ${({ $position }) =>
    $position === "top-left" ? "flex-start" : "center"};
  align-items: ${({ $position }) =>
    $position === "top-left" ? "flex-start" : "flex-end"};
  text-align: ${({ $position }) =>
    $position === "top-left" ? "left" : "center"};
  padding: 4rem;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

// Text Content
export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  color: white;
  margin: 1rem 0 2rem 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

export const HeroButton = styled.a`
  background-color: #6a380f;
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5c320d;
  }
`;

// Arrows
export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: white;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 0.5rem;

  &:hover {
    color: #ddd;
  }
`;

export const PrevArrow = styled(ArrowButton)`
  left: 20px;
`;

export const NextArrow = styled(ArrowButton)`
  right: 20px;
`;

// Dots
export const DotsWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#6a380f" : "#ccc")};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #6a380f;
  }
`;

// Content Block
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ position }) =>
    position === "top-left" ? "flex-start" : "center"};
  justify-content: center;
  max-width: 800px;
  width: 100%;
  gap: 1rem;
`;
